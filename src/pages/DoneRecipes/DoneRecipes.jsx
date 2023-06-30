/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import Header from '../../components/Header/Header';
import AppContext from '../../context/Context/AppContext';
import DoneRecipesCard from '../../components/DoneRecipesCard/DoneRecipesCard';
import './DoneRecipes.css';

export default function DoneRecipes() {
  const { setSearchRender, setIsShowing } = useContext(AppContext);
  const [data, setData] = useState([]);

  const getDoneRecipesStorage = () => {
    const results = JSON.parse(localStorage.getItem('doneRecipes'));
    setData(results);
  };

  useEffect(() => {
    setSearchRender(true);
    setIsShowing(false);
    getDoneRecipesStorage();
  }, []);

  const filterByFood = () => {
    const results = JSON.parse(localStorage.getItem('doneRecipes'));
    const filteredResults = results.filter((recipe) => recipe.type === 'food');
    console.log(filteredResults);
    setData(filteredResults);
  };

  const filterByDrink = () => {
    const results = JSON.parse(localStorage.getItem('doneRecipes'));
    const filteredResults = results.filter((recipe) => recipe.type === 'drink');
    console.log(filteredResults);
    setData(filteredResults);
  };

  return (
    <main className="container-done">
      <Header title="Done Recipes" />
      <div className="container-category-button">
        <button
          className="category-button"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ getDoneRecipesStorage }
        >
          All
        </button>
        <button
          className="category-button"
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ filterByFood }
        >
          Food
        </button>
        <button
          className="category-button"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ filterByDrink }
        >
          Drink
        </button>
      </div>
      <DoneRecipesCard data={ data } />
    </main>
  );
}
