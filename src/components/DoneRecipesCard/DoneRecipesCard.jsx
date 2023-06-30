import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TWO_SECONDS } from '../../helpers/constants';
import shareIcon from '../../images/shareIcon.svg';

export default function DoneRecipesCard({ data }) {
  const [isShowingMessage, setIsShowingMessage] = useState(false);

  const handleShare = (param) => {
    const pathname = param.type === 'food' ? `/foods/${param.id}` : `/drinks/${param.id}`;
    const shareRecipe = navigator.clipboard.writeText(`http://localhost:3000${pathname}`);

    setIsShowingMessage(true);
    setTimeout(() => {
      setIsShowingMessage(false);
    }, TWO_SECONDS);
    return shareRecipe;
  };

  return (
    <div className="container-cards-done">
      { data && data.map((item, index) => (
        <section
          key={ `${index}-done-recipe-card` }
          className="card-done"
        >
          <div className="container-title-done">
            <Link
              to={ item.type === 'food' ? `/foods/${item.id}` : `/drinks/${item.id}` }
            >
              <img
                className="card-image-done"
                src={ item.image }
                alt="Recipe"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <h3
              className="card-name-done"
              data-testid={ `${index}-horizontal-name` }
            >
              { item.name }
            </h3>
            <button
              className="share-button-done"
              type="button"
              onClick={ () => handleShare(item) }
            >
              <img
                className="share-icon-done"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Share icon"
              />
            </button>
          </div>
          <h4
            className="card-type-done"
            data-testid={ `${index}-horizontal-top-text` }
          >
            { item.nationality }
            { item.type === 'food' ? ' - ' : null}
            { item.category }
            { isShowingMessage ? ' - ' : null }
            { isShowingMessage ? <span className="category">Link copied!</span> : null}
            { item.type === 'drink' && (
              <p>{ item.alcoholicOrNot }</p>) }
          </h4>
          { item.type === 'food' && (
            <div className="container-tags-done">
              { item.tags.map((element) => (
                <span
                  key={ element }
                  className="tags-done"
                  data-testid={ `${index}-${element}-horizontal-tag` }
                >
                  { element }
                </span>
              ))}
            </div>
          )}
          <h4
            className="card-date-done"
            data-testid={ `${index}-horizontal-done-date` }
          >
            { `Done in ${item.doneDate}` }
          </h4>
        </section>
      ))}
    </div>
  );
}

DoneRecipesCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
