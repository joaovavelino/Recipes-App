import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';

function Header({ title }) {
  const { searchRender, isShowing } = useContext(AppContext);
  const [searchButton, setSearchButton] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();

  return (
    <header className="container-header">
      <section className="container-header-top">
        <button
          className="profile-button"
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img
            className="profile-icon"
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="perfil-Icon"
          />
        </button>
        <h2
          className="title-header"
          data-testid="page-title"
        >
          { title }
        </h2>
        { searchRender && (
          <button
            className={ isShowing ? 'search-button' : 'invisible' }
            type="button"
            onClick={ () => setSearchButton(!searchButton) }
          >
            <img
              className={ isShowing ? 'search-icon' : 'invisible' }
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="profileIcon"
            />
          </button>) }
      </section>
      <section className="container-header-bottom">
        <div>
          { searchButton && (
            <div>
              <input
                className="search-input"
                type="text"
                data-testid="search-input"
                value={ searchInput }
                onChange={ (e) => setSearchInput(e.target.value) }
              />
              <SearchBar input={ searchInput } />
            </div>) }
        </div>
      </section>

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
