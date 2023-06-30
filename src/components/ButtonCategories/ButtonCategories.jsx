import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/Context/AppContext';
import { mealsAPI } from '../../services/mealsAPI';
import { cocktailsAPI } from '../../services/cocktailsAPI';
import Button from '../Button/Button';

const ButtonCategories = ({ list }) => {
  const { isFood, setMeals, setDrinks } = useContext(AppContext);

  const handleAllButton = async () => {
    if (isFood) {
      const results = await mealsAPI();
      results.length = 12;
      setMeals(results);
    } else {
      const results = await cocktailsAPI();
      results.length = 12;
      setDrinks(results);
    }
  };

  return (
    <section className="container-category-button">
      <div>
        <button
          className="category-button"
          type="button"
          data-testid="All-category-filter"
          onClick={ handleAllButton }
        >
          All
        </button>
      </div>
      { list.map(({ strCategory }, index) => (
        <div
          key={ `${index}-button-category` }
        >
          <Button
            dataTestId={ `${strCategory}-category-filter` }
            name={ strCategory }
          >
            { strCategory }
          </Button>
        </div>
      )) }
    </section>

  );
};

ButtonCategories.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ButtonCategories;
