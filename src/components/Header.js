import { useEffect, useState, useCallback } from 'react';
import logo from "../images/Logo.svg";
import { Link, useLocation } from 'react-router-dom';

export default function Header({ isLoggedIn, email, onSignOut }) {
   const location = useLocation();
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
         {location.pathname === '/sign-in' && (
            <Link to="/sign-up" className="header__link">
               Регистрация
            </Link>
         )}
         {location.pathname === '/sign-up' && (
            <Link to="/sign-in" className="header__link">
               Войти
            </Link>
         )}
         {isLoggedIn && (
            <>
               <div className='header__burger-menu'>
                  <button type="button"
                     className={`${isClicked ? 'header__button header__button_close' : 'header__button header__button_burger'}`}
                     onClick={handleClickMenu}>
                     <span></span>
                  </button>
               </div>
               <nav className={`${isClicked ? 'header__user-menu' : 'not-active'}`}>
                  <p className='header__email'>{email}</p>
                  <button
                     onClick={() => {
                        onSignOut();
                        handleClickMenu();
                     }}
                     className='header__link header__link_button'>Выйти</button>
               </nav>
            </>
         )}

      </header>
   );
};