import React from 'react';
import PropTypes from 'prop-types';

export default function Ingredients({ ingredients, measures, recipes }) {
  return (
    <ul className="ingredients">
      {
        ingredients.map((ingredient, index) => (recipes[ingredient] && (
          <li
            key={ `${index}-ingredient-name-and-measure` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `- ${recipes[ingredient]}` }
            { recipes[measures[index]] ? ': ' : null}
            { recipes[measures[index]] }
          </li>
        )
        ))
      }
    </ul>
  );
}

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
