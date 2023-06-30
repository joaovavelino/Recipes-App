import React, { useEffect, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { fetchRandomDrinks } from '../../services/cocktailsAPI';

export default function ExploreDrinks() {
  const { setSearchRender, setIsShowing } = useContext(AppContext);
  const [id, setId] = useState('');
  const history = useHistory();

  const redirectToRandomDrink = async () => {
    const results = await fetchRandomDrinks();
    setId(results.idDrink);
  };

  useEffect(() => {
    setSearchRender(true);
    redirectToRandomDrink();
    setIsShowing(false);
  }, [setSearchRender, setIsShowing]);

  return (
    <main className="container-done>">
      <Header title="Explore Drinks" />
      <div className="container-explore-buttons">
        <Link to="/explore/drinks/ingredients">
          <button
            className="explore-buttons"
            data-testid="explore-by-ingredient"
            type="button"
          >
            By Ingredient
          </button>
        </Link>
        <button
          className="explore-buttons"
          data-testid="explore-surprise"
          type="button"
          onClick={ () => history.push(`/drinks/${id}`) }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </main>
  );
}
