import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../../images/mealIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import './Footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <div className="container-footer">
        <Link
          to="/foods"
        >
          <img
            className="footer-icon"
            src={ mealIcon }
            alt="Foods"
            data-testid="food-bottom-btn"
            height="70"
            width="70"
          />
        </Link>
        <Link
          to="/explore"
        >
          <img
            className="footer-icon"
            src={ exploreIcon }
            alt="Explore"
            data-testid="explore-bottom-btn"
            height="68"
            width="68"
          />
        </Link>
        <Link
          to="/drinks"
        >
          <img
            className="footer-icon"
            src={ drinkIcon }
            alt="Drinks"
            data-testid="drinks-bottom-btn"
            height="68"
            width="68"
          />
        </Link>
      </div>
    </footer>
  );
}
