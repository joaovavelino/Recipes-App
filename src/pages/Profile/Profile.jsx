/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import AppContext from '../../context/Context/AppContext';

function Profile() {
  const { setSearchRender, setIsShowing } = useContext(AppContext);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setSearchRender(true);
    setIsShowing(false);

    const getEmail = JSON.parse(localStorage.getItem('user'));
    if (getEmail) {
      setEmail(getEmail.email);
    }
  }, []);

  const history = useHistory();

  const toFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const toDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <main className="container-done">
      <Header title="Profile" />
      <section>
        <p
          className="info"
        >
          User logged in:
        </p>
        <p
          className="email"
          data-testid="profile-email"
        >
          {email}
        </p>
        <button
          className="profile-buttons"
          type="button"
          data-testid="profile-done-btn"
          onClick={ toDoneRecipes }
        >
          Done Recipes
        </button>
        <button
          className="profile-buttons"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ toFavoriteRecipes }
        >
          Favorite Recipes
        </button>
        <button
          className="profile-buttons-logout"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ clearLocalStorage }
        >
          Logout
        </button>
        <Footer />
      </section>
    </main>
  );
}

export default Profile;
