import { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithConfirmation from './PopupWithConfirmation';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from "./Login";
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/Auth.js';

function App() {

  const [userInfo, setUserInfo] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = useState(false);
  const [cardtoDelete, setCardtoDelete] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res)
      })
      .catch(err => console.log(err));
  }, [])

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    auth
      .getContent(jwt)
      .then((data) => {
        setUserInfo(data.data.email);
        setIsLoggedIn(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn,history]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(err => console.log(err));
  }

  function handleCardDeleteComf(card) {
    setIsLoading(true);
    api.deleteCard(card._id).then(() => {
      setCards((item) => item.filter((c) => c._id !== card._id));
      closeAllPopups();
    }).catch(err => console.log(err))
      .finally(() => { setIsLoading(false) });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.changeInfo(data).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    }).catch(err => console.log(err))
      .finally(() => { setIsLoading(false) });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.changeAvatar(data).then((newAvatar) => {
      setCurrentUser(newAvatar);
      closeAllPopups();
    }).catch(err => console.log(err))
      .finally(() => { setIsLoading(false) });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(err => console.log(err))
      .finally(() => { setIsLoading(false) });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleCardDelete(card) {
    setCardtoDelete(card);
    setIsCardDeletePopupOpen(true)
  }

  function openInfoTooltip() {
    setIsInfoTooltipOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function onLogin(data) {
    return auth
      .login(data)
      .then((res) => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', res.token);
      });
  };

  const onRegister = (data) => {
    return auth
      .register(data)
      .then(() => {
        setIsSuccessful(true);
        openInfoTooltip();
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessful(false);
        openInfoTooltip();
      });
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <body className="page">
        <div className="page__container">

          <Header
            email={userInfo}
            onSignOut={handleSignOut} />

          <Switch>
            <ProtectedRoute
              exact path="/"
              isLoggedIn={isLoggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              сards={cards}
            />

            <Route path="/sign-up">
              <Register onRegister={onRegister} />
            </Route>

            <Route path="/sign-in">
              <Login onLogin={onLogin} />
            </Route>
            <Route>
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            loading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            loading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateCard={handleAddPlaceSubmit}
            loading={isLoading}
          />

          <PopupWithConfirmation
            isOpen={isCardDeletePopupOpen}
            card={cardtoDelete}
            loading={isLoading}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDeleteComf}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
            isSuccess={isSuccessful}
          />

        </div>
      </body>
    </CurrentUserContext.Provider>
  );
}

export default App;