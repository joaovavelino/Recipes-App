import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import AppContext from '../../context/Context/AppContext';

const Recipes = ({ data }) => {
  const { isFood } = useContext(AppContext);

  if (data.length === 1) {
    return (
      <Redirect
        to={ isFood ? `/foods/${data[0].idMeal}` : `/drinks/${data[0].idDrink}` }
      />
    );
  }

  return (
    <div className="container-cards">
      { data && data.map((item, index) => (
        <section
          key={ `${index}-recipe-card` }
          className="card"
          data-testid={ `${index}-recipe-card` }
        >
          <Link to={ isFood ? `/foods/${item.idMeal}` : `/drinks/${item.idDrink}` }>
            <img
              className="card-image"
              src={ item.strMealThumb || item.strDrinkThumb }
              alt="Recipe"
              data-testid={ `${index}-card-img` }
            />
            <h3
              className="card-name"
              data-testid={ `${index}-card-name` }
            >
              { item.strMeal || item.strDrink }
            </h3>
          </Link>
        </section>
      ))}
    </div>
  );
};

Recipes.propTypes = {
  data: propTypes.arrayOf(propTypes.object),
}.isRequired;

export default Recipes;
