import React, { /* useContext */ } from 'react';
/* import AppContext from '../../context/Context/AppContext'; */

export default function RecipesDetails({ data }) {
  /* const {} = useContext(AppContext); */

  return (
    data && data.map((item, index) => (
      <section
        key={ `${index}-recipe-card` }
        data-testid={ `${index}-recomendation-card` }
      >
        <img
          src={ item.strMealThumb || item.strDrinkThumb }
          alt="Recipe"
          data-testid="recipe-photo"
        />
        <h3
          data-testid="recipe-title"
        >
          { item.strMeal || item.strDrink }
        </h3>
      </section>
    ))
  );
}
