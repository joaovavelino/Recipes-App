import React, { useContext } from 'react';
import propTypes from 'prop-types';
import AppContext from '../../context/Context/AppContext';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function UnfavoriteButton({ id, datatestid }) {
  const { setFavorites, favorites } = useContext(AppContext);

  const removeFromFavorites = () => {
    const storage = favorites;
    const results = storage.filter((favorite) => favorite.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(results));
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  return (
    <button
      className="like-button-done"
      type="button"
      id={ id }
      onClick={ removeFromFavorites }
    >
      <img
        className="like-icon-done"
        src={ blackHeartIcon }
        alt="Like icon"
        data-testid={ datatestid }
      />
    </button>
  );
}

UnfavoriteButton.propTypes = {
  id: propTypes.string,
}.isRequired;
