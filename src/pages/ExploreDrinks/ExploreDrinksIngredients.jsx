/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { fetchDrinkIngredients } from '../../services/cocktailsAPI';
import { RECIPES_LENGTH } from '../../helpers/constants';

export default function ExploreDrinksIngredients() {
  const {
    setSearchRender,
    setAutomaticFilterByIngredient,
    setIngredient,
    setIsShowing,
  } = useContext(AppContext);

  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();

  const getDrinkIngredients = async () => {
    const results = await fetchDrinkIngredients();
    setIngredients(results.slice(0, RECIPES_LENGTH));
  };

  const handleRedirect = (param) => {
    setAutomaticFilterByIngredient(true);
    setIngredient(param);
    history.push('/drinks');
  };

  useEffect(() => {
    setSearchRender(true);
    getDrinkIngredients();
    setIsShowing(false);
  }, []);

  return (
    <main className="container-done>">
      <Header title="Explore Ingredients" />
      <div className="container-explore-ingredients">
        { ingredients && ingredients.map((ingredient, index) => (
          <div
            key={ ingredient.strIngredient1 }
            className="card-explore"
            data-testid={ `${index}-ingredient-card` }
          >
            <button
              className="card-explore-button"
              type="button"
              onClick={ () => handleRedirect(ingredient.strIngredient1) }
            >
              <h2
                className="card-explore-title"
                data-testid={ `${index}-card-name` }
              >
                { ingredient.strIngredient1 }
              </h2>
              <img
                className="card-explore-image"
                data-testid={ `${index}-card-img` }
                alt={ ingredient.strIngredient1 }
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
              />
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}
