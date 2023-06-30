import React, { useEffect, useContext, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import { mealsIdAPI } from '../../services/mealsAPI';
import { cocktailsAPI } from '../../services/cocktailsAPI';
import Ingredients from '../../components/Ingredients/Ingredients';
import Recommended from '../../components/Recommended/Recommended';
import { RECOMENDATION_LENGTH, TWO_SECONDS } from '../../helpers/constants';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './FoodDetails.css';

export default function FoodDetails() {
  const { meals, setMeals } = useContext(AppContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [isShowingMessage, setIsShowingMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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
    const fetchMealsId = async () => {
      const response = await mealsIdAPI(id);
      setMeals(response);
      filterIngredientsFunction(response);
      filterMeasuresFunction(response);
    };
    fetchMealsId();

    const fetchMealsRecomendation = async () => {
      const response = await cocktailsAPI();
      setRecomendation(response.slice(0, RECOMENDATION_LENGTH));
    };
    fetchMealsRecomendation();

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
  }, [id, setMeals]);

  const checkInProgressRecipe = () => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (storage) {
      const values = Object.keys(storage.meals);
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
        type: 'food',
        nationality: meals[0].strArea,
        category: meals[0].strCategory,
        alcoholicOrNot: '',
        name: meals[0].strMeal,
        image: meals[0].strMealThumb,
      };
      setIsFavorite(true);

      const previousObjects = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const updatedObjects = [...previousObjects, newObj];
      const nonRepeatedObjects = [...new Map(updatedObjects.map((it) => [it.id, it]))
        .values()];
      localStorage.setItem('favoriteRecipes', JSON.stringify(nonRepeatedObjects));
    }
  };

  return (
    <main className="container-details">
      { meals && meals.map((meal) => (
        <section key={ meal.idMeal }>
          <div className="container-title">
            <img
              className="image"
              src={ meal.strMealThumb }
              alt={ meal.idMeal }
              data-testid="recipe-photo"
            />
            <h3
              className="title"
              data-testid="recipe-title"
            >
              { meal.strMeal }
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
            { meal.strCategory }
            { isShowingMessage ? ' - ' : null }
            { isShowingMessage ? <span className="category">Link copied!</span> : null }
          </p>
          <h5 className="title-details">Ingredients</h5>
          <Ingredients
            recipes={ meals[0] }
            ingredients={ ingredients }
            measures={ measures }
          />
          <h5 className="title-details">Instructions</h5>
          <p
            className="instructions"
            data-testid="instructions"
          >
            { meal.strInstructions }
          </p>
          <iframe
            className="video-details"
            src={ `https://www.youtube.com/embed/${meal.strYoutube.split('=')[1]}` }
            title={ meal.strTags }
            data-testid="video"
          />
          <h5 className="title-details">Recommended</h5>
          <Recommended data={ recomendation } />
          <div className="container-start-recipe-btn">
            <Link to={ `/foods/${id}/in-progress` }>
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
