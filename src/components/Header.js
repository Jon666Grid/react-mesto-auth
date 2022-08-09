import { useEffect, useState } from 'react';
import logo from "../images/Logo.svg";
import { Link, Route } from 'react-router-dom';

export default function Header(props) {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   //* Проверка ширины окна при монтировании компонентов.
   useEffect(() => {
      const resizeWindow = (() => {
         if (window.innerWidth >= 639) {
            setIsMenuOpen(true)
         }
      });
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);
   }, []);

   function handleClickMenu() {
      setIsMenuOpen(!isMenuOpen)
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
                  className={`${isMenuOpen ? 'header__button header__button_close' : 'header__button header__button_burger'}`}
                  onClick={handleClickMenu}>
                  <span></span>
               </button>
            </div>
            <nav className={`${isMenuOpen ? 'header__user-menu' : 'not-active'}`}>
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