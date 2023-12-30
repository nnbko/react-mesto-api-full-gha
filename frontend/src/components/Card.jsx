import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName  = ( 
        `elements__like ${isLiked && 'elements__like_active' }` 
      );

    function handleCardClick() {
        onCardClick(card);
      }
      function handleCardLike() {
        onCardLike(card);
      }
      function handleDeleteClick() {
        onCardDelete(card);
      }

    return (
        <div className="elements__card">
            {isOwn && <button className="elements__delete" onClick={handleDeleteClick} />} 
            <img
            title={card.name}
            src={card.link} 
            alt={card.name}
            className="elements__image"
            onClick={handleCardClick}
            />
            <div className="elements__text">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__group">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleCardLike}></button>
                    <h3 className="element__like-count" name="">{card.likes.length}</h3>
                </div>
            </div>
        </div>
    )
}