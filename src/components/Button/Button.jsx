/* eslint-disable no-nested-ternary */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/Context/AppContext';
import { mealsAPI, mealsCategoriesAPI } from '../../services/mealsAPI';
import { cocktailsAPI, cocktailsCategoriesAPI } from '../../services/cocktailsAPI';
import { RECIPES_LENGTH } from '../../helpers/constants';

export default function Button({ dataTestId, name }) {
  const { isFood, setMeals, setDrinks } = useContext(AppContext);
  const [toggle, setToggle] = useState(false);

  const handleClick = async (category) => {
    if (toggle) {
      if (isFood) {
        const results = await mealsAPI();
        setMeals(results.slice(0, RECIPES_LENGTH));
      } else {
        const results = await cocktailsAPI();
        setDrinks(results.slice(0, RECIPES_LENGTH));
      }
    }

    if (!toggle) {
      if (isFood) {
        const results = await mealsCategoriesAPI(category);
        setMeals(results.slice(0, RECIPES_LENGTH));
      } else {
        const results = await cocktailsCategoriesAPI(category);
        setDrinks(results.slice(0, RECIPES_LENGTH));
      }
    }
    setToggle(!toggle);
  };

  return (
    <button
      className="category-button"
      type="button"
      data-testid={ dataTestId }
      onClick={ () => handleClick(name) }
    >
      { name }
    </button>
  );
}

Button.propTypes = {
  key: PropTypes.string,
  dataTestId: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.string,
}.isRequired;
