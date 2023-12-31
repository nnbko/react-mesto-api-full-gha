import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../utils/Api.js';
import * as auth from '../utils/auth';
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ImagePopup from './ImagePopup.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import InfoTooltip from './InfoTooltip.jsx';
import tooltipSuccessImg from '../images/success.svg';
import tooltipDeniedImg from '../images/denied.svg';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ link: '', name: '' });
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isCardPopupOpen, setCardPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  //pr12
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setProfileEmail] = React.useState("");
  const [isInfoTooltipPopupOpen, setInfoTooltipopupOpen] = React.useState(false);
  const [tooltipInfo, setTooltipInfo] = React.useState({ src: '', text: '', });
  React.useEffect(() => {
    if (loggedIn) {
      api
        .getAllInfo()
        .then(([userData, card]) => {
          setCurrentUser(userData);
          setCards(card);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken()
        .then(res => {
          navigate('/', { replace: true });
          setLoggedIn(true);
          setProfileEmail(res.email);
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn]);


  const onRegister = ({ email, password }) => {
    auth
      .register(email, password)
      .then(() => {
        setTooltipInfo({
          src: tooltipSuccessImg,
          text: 'Вы успешно зарегистрировались!',
        })
        setInfoTooltipopupOpen(true);
        navigate('/sign-in', { replace: true });
      })
      .catch(err => {
        console.log(`Ошибка при регистрации: ${err}`)
        setTooltipInfo({
          src: tooltipDeniedImg,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        })
        setInfoTooltipopupOpen(true);
      })
  };


  const onLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setProfileEmail(res.email);
        setLoggedIn(true);
        navigate('/', { replace: true });

      })
      .catch(err => {
        console.log(`Ошибка при авторизации: ${err}`)
        setTooltipInfo({
          src: tooltipDeniedImg,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        })
        setInfoTooltipopupOpen(true);
      })
  }


  const signOut = () => {
    localStorage.removeItem('jwt');
    setProfileEmail("");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  };
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }

  const handleComfirmClick = () => {
    setConfirmPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setCardPopupOpen(true)
  }

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);
    setCardPopupOpen(false);
    setInfoTooltipopupOpen(false);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((id) => id !== card));
      })
      .catch((err) => {
        console.log(err);
      })
  }
  function handleUpdateUser(data) {
    api.pushUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  function handleUpdateAvatar(data) {
    api
      .pushAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function handleAddPlace(data) {
    api
      .pushInfoCreateCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  };


  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={

            <ProtectedRoute
              element={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onDeleteCard={handleComfirmClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onSignOut={signOut}
              email={email}
            />

          } />
          <Route path="/sign-up" element={
            <Register onRegister={onRegister} />
          }>
          </Route>
          <Route path="/sign-in" element={
            <Login onLogin={onLogin} />
          }>
          </Route>


        </Routes>

        <Footer />
        <ImagePopup
          isOpen={isCardPopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          name="delete"
          btnText="Да"
          title="Вы уверены?">
        </PopupWithForm>

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          src={tooltipInfo.src}
          text={tooltipInfo.text}
        />

      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
