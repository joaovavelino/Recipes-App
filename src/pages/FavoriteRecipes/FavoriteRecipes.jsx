/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import Header from '../../components/Header/Header';
import UnfavoriteButton from '../../components/unfavoriteButton/UnfavoriteButton';
import ShareButton from '../../components/ShareButton/ShareButton';

export default function FavoriteRecipes() {
  const {
    setSearchRender,
    favorites,
    isShowingMessage,
    setIsShowing,
    setFavorites,
  } = useContext(AppContext);

  const [data, setData] = useState([]);

  const getFavorites = () => {
    setData(favorites);
  };

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  useEffect(() => {
    setSearchRender(true);
    setIsShowing(false);
    getFavorites();
  }, [favorites]);

  const filterByFoods = () => {
    const results = favorites.filter((food) => food.type === 'food');
    setData(results);
  };

  const filterByDrinks = () => {
    const results = favorites.filter((food) => food.type === 'drink');
    setData(results);
  };

  return (
    <main className="container-done">
      <Header title="Favorite Recipes" />
      <div className="container-category-button">
        <button
          className="category-button"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ getFavorites }
        >
          All
        </button>
        <button
          className="category-button"
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ filterByFoods }
        >
          Food
        </button>
        <button
          className="category-button"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ filterByDrinks }
        >
          Drink
        </button>
      </div>
      <div className="container-cards-done">
        { data && data.map((favorite, index) => (
          <section
            key={ favorite.id }
            className="card-done"
          >
            <div className="container-title-done">
              <Link
                to={ favorite.type === 'food'
                  ? `/foods/${favorite.id}` : `/drinks/${favorite.id}` }
              >
                <img
                  className="card-image-done"
                  data-testid={ `${index}-horizontal-image` }
                  src={ favorite.image }
                  alt={ favorite.name }
                />
              </Link>
              <h3
                className="card-name-done"
                data-testid={ `${index}-horizontal-name` }
              >
                { favorite.name }
              </h3>
              <div>
                <ShareButton
                  id={ favorite.id }
                  datatestid={ `${index}-horizontal-share-btn` }
                  type={ favorite.type }
                />
                <UnfavoriteButton
                  datatestid={ `${index}-horizontal-favorite-btn` }
                  id={ favorite.id }
                />
              </div>
            </div>
            <p
              className="card-type-done"
              data-testid={ `${index}-horizontal-top-text` }
            >
              { favorite.category }
              { isShowingMessage ? ' - ' : null }
              { isShowingMessage ? <span className="category">Link copied!</span> : null}
            </p>
            { favorite.type === 'food'
              ? <p className="card-type-done">{favorite.nationality}</p>
              : <p className="card-type-done">{favorite.alcoholicOrNot}</p> }
          </section>
        )) }
      </div>
    </main>
  );
}
