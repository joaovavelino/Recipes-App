/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../input/input';

function IngredientsInProgress({ setDisabled,
  isFood, id, ingredients, measures, recipes, count, setCount }) {
  useEffect(() => {
  }, []);

  return (
    <ul className="ingredients">
      {
        ingredients.map((ingredient, index) => (recipes[ingredient] && (
          <li
            key={ `${index}-ingredient` }
            data-testid={ `${index}-ingredient-step` }
          >
            <Input
              setDisabled={ setDisabled }
              setCount={ setCount }
              count={ count }
              isFood={ isFood }
              type="checkbox"
              id={ `${index}-ingredient` }
              filterId={ id }
              value={ recipes[ingredient] }
              measures={ recipes[measures[index]] }
            />
          </li>
        )
        ))
      }
    </ul>
  );
}

export default IngredientsInProgress;

IngredientsInProgress.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
