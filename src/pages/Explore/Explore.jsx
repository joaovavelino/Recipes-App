import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Explore() {
  const { setSearchRender, setIsShowing } = useContext(AppContext);

  useEffect(() => {
    setSearchRender(true);
    setIsShowing(false);
  }, [setSearchRender, setIsShowing]);

  return (
    <main className="container-done">
      <Header title="Explore" />
      <div className="container-explore-buttons">
        <Link to="/explore/foods">
          <button
            className="explore-buttons"
            data-testid="explore-foods"
            type="button"
          >
            Explore Foods
          </button>
        </Link>
        <Link to="/explore/drinks">
          <button
            className="explore-buttons"
            data-testid="explore-drinks"
            type="button"
          >
            Explore Drinks
          </button>
        </Link>
      </div>
      <Footer />
    </main>
  );
}
