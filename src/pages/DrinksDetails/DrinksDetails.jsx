import React, { useEffect, useContext, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import { cocktailsIdAPI } from '../../services/cocktailsAPI';
import { mealsAPI } from '../../services/mealsAPI';
import Ingredients from '../../components/Ingredients/Ingredients';
import Recommended from '../../components/Recommended/Recommended';
import { RECOMENDATION_LENGTH, TWO_SECONDS } from '../../helpers/constants';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function DrinksDetails() {
  const { drinks, setDrinks } = useContext(AppContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [isShowingMessage, setIsShowingMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true);

  const filterIngredientsFunction = (array) => {
    const keys = Object.keys(array[0]);
    const results = keys.filter((key) => key && key.includes('strIngredient'));
    setIngredients(results);
  };

  const filterMeasuresFunction = (array) => {
    const keys = Object.keys(array[0]);
    const results = keys.filter((key) => key && key.includes('strMeasure'));
    setMeasures(results);
  };

  useEffect(() => {
    const fetchDrinksId = async () => {
      const response = await cocktailsIdAPI(id);
      setDrinks(response);
      filterIngredientsFunction(response);
      filterMeasuresFunction(response);
    };
    fetchDrinksId();

    const fetchDrinksRecomendation = async () => {
      const response = await mealsAPI();
      setRecomendation(response.slice(0, RECOMENDATION_LENGTH));
    };
    fetchDrinksRecomendation();

    const verifyFavoriteRecipes = () => {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const results = storage.some((recipe) => recipe.id === id);

      if (results) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    };
    verifyFavoriteRecipes();
  }, [id, setDrinks]);

  const checkInProgressRecipe = () => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (storage) {
      const values = Object.keys(storage.cocktails);
      const results = values.some((item) => item === id);
      if (results) {
        return true;
      }
      return false;
    }
    return false;
  };

  const handleShare = () => {
    const shareRecipe = navigator.clipboard.writeText(`http://localhost:3000${pathname}`);

    setIsShowingMessage(true);
    setTimeout(() => {
      setIsShowingMessage(false);
    }, TWO_SECONDS);

    return shareRecipe;
  };

  const saveFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      const newObj = {
        id,
        type: 'drink',
        nationality: '',
        category: drinks[0].strCategory,
        alcoholicOrNot: drinks[0].strAlcoholic,
        name: drinks[0].strDrink,
        image: drinks[0].strDrinkThumb,
      };
      setIsFavorite(true);

      const previousObjects = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const updatedObjects = [...previousObjects, newObj];
      const nonRepeatedObjects = [...new Map(updatedObjects.map((v) => [v.id, v]))
        .values()];
      localStorage.setItem('favoriteRecipes', JSON.stringify(nonRepeatedObjects));
    }
  };

  return (
    <main className="container-details">
      { drinks && drinks.map((drink/* , index */) => (
        <section key={ drink.idDrink }>
          <div className="container-title">
            <img
              className="image"
              src={ drink.strDrinkThumb }
              alt={ drink.idDrink }
              data-testid="recipe-photo"
            />
            <h3
              className="title"
              data-testid="recipe-title"
            >
              { drink.strDrink }
            </h3>
            <div>
              <button
                className="share-button"
                type="button"
                data-testid="share-btn"
                onClick={ handleShare }
              >
                <img
                  className="share-icon"
                  src={ shareIcon }
                  alt="Share icon"
                />
              </button>
              <button
                className="like-button"
                type="button"
                onClick={ saveFavorite }
              >
                <img
                  className="like-icon"
                  src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                  alt="Like icon"
                  data-testid="favorite-btn"
                />
              </button>
            </div>
          </div>
          <p
            className="category"
            data-testid="recipe-category"
          >
            { drink.strAlcoholic }
            { isShowingMessage ? ' - ' : null }
            { isShowingMessage ? <span className="category">Link copied!</span> : null }
          </p>
          <h5 className="title-details">Ingredients</h5>
          <Ingredients
            recipes={ drinks[0] }
            ingredients={ ingredients }
            measures={ measures }
          />
          <h5 className="title-details">Instructions</h5>
          <p
            className="instructions"
            data-testid="instructions"
          >
            { drink.strInstructions }
          </p>
          <h5 className="title-details">Recommended</h5>
          <Recommended data={ recomendation } />
          <div className="container-start-recipe-btn">
            <Link to={ `/drinks/${id}/in-progress` }>
              <button
                className="start-recipe-btn"
                type="button"
                data-testid="start-recipe-btn"
              >
                { checkInProgressRecipe() ? 'Continue Recipe' : 'Start Recipe' }
              </button>
            </Link>
          </div>
        </section>
      ))}
    </main>
  );
}
