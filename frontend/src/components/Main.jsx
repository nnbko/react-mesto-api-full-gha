import React from 'react';
import Card from './Card.jsx'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Header from "./Header.jsx";
import { Link } from "react-router-dom";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete, signOut, email }) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <>
            <Header>
                <p className="header__email">{email}</p>
                <Link onClick={signOut} className="header__button" to="/sign-in">Выйти</Link>
            </Header>
            <main className="main">
                <section className="profile">
                    <div className="profile__edit">
                        <img
                            className="profile__avatar"
                            src={currentUser.avatar}
                            alt="аватар"
                            name="avatar"
                        />
                        <button type="button" className="profile__avatar-edit-button" onClick={onEditAvatar} />
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" onClick={onEditProfile} />
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                    <button className="profile__add-button" type="button" onClick={onAddPlace} />
                </section>
                <section className="elements">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </section>
            </main>
        </>
    )
}