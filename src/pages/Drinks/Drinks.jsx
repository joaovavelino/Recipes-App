import React, { useContext, useEffect, useState } from 'react';
import {
  cocktailsAPI,
  cocktailsListAPI,
  getDrinkByIngredient } from '../../services/cocktailsAPI';
import AppContext from '../../context/Context/AppContext';
import { RECIPES_LENGTH, CATEGORIES_LENGTH } from '../../helpers/constants';
import Header from '../../components/Header/Header';
import Recipes from '../../components/Recipes/Recipes';
import ButtonCategories from '../../components/ButtonCategories/ButtonCategories';
import Footer from '../../components/Footer/Footer';

export default function Drinks() {
  const {
    drinks,
    setDrinks,
    setIsFood,
    setSearchRender,
    automaticFilterByIngredient,
    setAutomaticFilterByIngredient,
    ingredient,
  } = useContext(AppContext);
  const [drinksList, setDrinksList] = useState([]);

  const fetchbyingredient = async (param) => {
    const results = await getDrinkByIngredient(param);
    setDrinks(results);
  };

  useEffect(() => {
    setDrinks([]);
    setIsFood(false);
    setSearchRender(true);
    const fetchCocktailsList = async () => {
      const response = await cocktailsListAPI();
      setDrinksList(response.slice(0, CATEGORIES_LENGTH));
    };
    if (automaticFilterByIngredient) {
      fetchbyingredient(ingredient);
      fetchCocktailsList();
      setAutomaticFilterByIngredient(false);
    }
    if (!automaticFilterByIngredient) {
      const fetchDrinks = async () => {
        const response = await cocktailsAPI();
        setDrinks(response.slice(0, RECIPES_LENGTH));
      };
      fetchDrinks();
      fetchCocktailsList();
    }
  }, []);

  return (
    <main className="container-all">
      <Header title="Drinks" />
      <ButtonCategories list={ drinksList } />
      <Recipes data={ drinks || [] } />
      <Footer />
    </main>
  );
}
