import React from 'react';
import PropTypes from 'prop-types';

export default function Recommended({ data }) {
  return (
    <div className="container-carousel">
      <div className="carousel">
        { data && data.map((item, index) => (
          <section
            key={ `${index}-recomendation-card` }
            data-testid={ `${index}-recomendation-card` }
            className={ `${index <= 1 ? 'card' : 'not-visible'}` }
          >
            <img
              className="card-image"
              src={ item.strMealThumb || item.strDrinkThumb }
              alt="Recomendation"
            />
            <h4
              className="card-name"
              data-testid={ `${index}-recomendation-title` }
            >
              { item.strMeal || item.strDrink }
            </h4>
          </section>
        ))}
      </div>
    </div>
  );
}

Recommended.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
