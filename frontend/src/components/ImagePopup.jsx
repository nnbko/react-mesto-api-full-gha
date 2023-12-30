import React from 'react';

export default function ImagePopup({ isOpen, card, onClose }) {
  return (
    <div className={`popup popup_card ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__photo">
        <button className="popup__close popup__close_photo" type="button" onClick={onClose} />
        <img className="popup__image" 
        src={card?.link} 
        alt={card?.name} />
        <h3 className="popup__title-photo">{card?.name}</h3>
      </div>
    </div>
  )
}