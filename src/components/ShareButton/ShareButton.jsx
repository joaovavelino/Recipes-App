import React, { useState } from 'react';
import propTypes from 'prop-types';
import { TWO_SECONDS } from '../../helpers/constants';
import shareIcon from '../../images/shareIcon.svg';

export default function ShareButton({ datatestid, id, type }) {
  const [isShowingMessage, setIsShowingMessage] = useState(false);

  const handleShare = () => {
    const pathname = type === 'food' ? `/foods/${id}` : `/drinks/${id}`;
    const shareRecipe = navigator.clipboard.writeText(`http://localhost:3000${pathname}`);

    setIsShowingMessage(true);
    setTimeout(() => {
      setIsShowingMessage(false);
    }, TWO_SECONDS);
    return shareRecipe;
  };

  return (
    <>
      { isShowingMessage ? <span className="category">Link copied!</span> : null}
      <button
        className="share-button-done"
        type="button"
        onClick={ handleShare }
        id={ id }
      >
        <img
          className="share-icon-done"
          data-testid={ datatestid }
          src={ shareIcon }
          alt="Share icon"
        />
      </button>
    </>
  );
}

ShareButton.propTypes = {
  onClick: propTypes.func,
  datatestid: propTypes.string,
  id: propTypes.string,
}.isRequired;
