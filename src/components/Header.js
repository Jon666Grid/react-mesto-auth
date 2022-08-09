import { useEffect, useState, useCallback } from 'react';
import logo from "../images/Logo.svg";
import { Link, Route } from 'react-router-dom';

export default function Header(props) {
   const [isClicked, setIsClicked] = useState(false);
   const [iswindow, setIsWindow] = useState(0);

   //*Проверка ширины окна просмотра. 
   const resizeWindow = useCallback(() => {
      setIsWindow(window.innerWidth);
      if (iswindow >= 639) {
         setIsClicked(true);
      }
   }, [iswindow]);

   //* Проверка ширины окна при монтировании компонентов.
   useEffect(() => {
      resizeWindow();
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);
   }, [resizeWindow]);

   function handleClickMenu() {
      setIsClicked(!isClicked)
   }

   return (
      <header className="header">
         <img
            className="header__logo"
            src={logo}
            alt="логотип"
         />
         <Route path="/sign-in">
            <Link to="/sign-up" className="header__link">
               Регистрация
            </Link>
         </Route>
         <Route path="/sign-up">
            <Link to="/sign-in" className="header__link">
               Войти
            </Link>
         </Route>
         <Route exact path="/">
            <div className='header__burger-menu'>
               <button type="button"
                  className={`${isClicked ? 'header__button header__button_close' : 'header__button header__button_burger'}`}
                  onClick={handleClickMenu}>
                  <span></span>
               </button>
            </div>
            <nav className={`${isClicked ? 'header__user-menu' : 'not-active'}`}>
               <p className='header__email'>{props.email}</p>
               <button
                  onClick={() => {
                     props.onSignOut();
                     handleClickMenu();
                  }}
                  className='header__link header__link_button'>Выйти</button>
            </nav>
         </Route>

      </header>
   );
};