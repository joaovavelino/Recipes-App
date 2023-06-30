import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/Context/AppContext';
import { fetchByIngredient, mealsAPI, mealsListAPI } from '../../services/mealsAPI';
import { RECIPES_LENGTH, CATEGORIES_LENGTH } from '../../helpers/constants';
import Header from '../../components/Header/Header';
import Recipes from '../../components/Recipes/Recipes';
import ButtonCategories from '../../components/ButtonCategories/ButtonCategories';
import Footer from '../../components/Footer/Footer';
import './Foods.css';

export default function Foods() {
  const {
    meals,
    setMeals,
    setIsFood,
    setSearchRender,
    automaticFilterByIngredient,
    setAutomaticFilterByIngredient,
    ingredient,
  } = useContext(AppContext);
  const [mealsList, setMealsList] = useState([]);

  const fetchbyingredient = async (param) => {
    const results = await fetchByIngredient(param);
    setMeals(results);
  };

  useEffect(() => {
    setMeals([]);
    setIsFood(true);
    setSearchRender(true);
    const fetchMealsList = async () => {
      const response = await mealsListAPI();
      setMealsList(response.slice(0, CATEGORIES_LENGTH));
    };
    if (automaticFilterByIngredient) {
      fetchbyingredient(ingredient);
      fetchMealsList();
      setAutomaticFilterByIngredient(false);
    }
    if (!automaticFilterByIngredient) {
      const fetchMeals = async () => {
        const response = await mealsAPI();
        setMeals(response.slice(0, RECIPES_LENGTH));
      };
      fetchMeals();
      fetchMealsList();
    }
  }, []);

  return (
    <main className="container-all">
      <Header title="Foods" />
      <ButtonCategories list={ mealsList } />
      <Recipes data={ meals || [] } />
      <Footer />
    </main>
  );
}
