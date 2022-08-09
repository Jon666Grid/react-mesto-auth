import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {
   const [registerData, setRegisterData] = useState({
      email: '',
      password: '',
   });

   const handleChange = (e) => {
      const { name, value } = e.target
      setRegisterData(registerData => ({
         ...registerData,
         [name]: value
      }));
   };



   const handleSubmit = (e) => {
      e.preventDefault()
      onRegister(registerData)
   }

   return (
      <form className="register"
         onSubmit={handleSubmit}>
         <h2 className="register__title">Регистрация</h2>
         <input autoComplete="on"
            className="register__email-input"
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            value={registerData.email}
            onChange={handleChange}
            minLength="2"
            maxLength="40" required />
         <input autoComplete="on"
            className="register__password-input"
            placeholder="Пароль"
            id="password"
            name="password"
            type="password"
            value={registerData.password}
            onChange={handleChange}
            minLength="2"
            maxLength="40"
            required />
         <button type="submit"
            className="register__button">Зарегистрироваться</button>
         <Link to="/sign-in"
            className="register__link">Уже зарегистрированы? Войти</Link>
      </form>
   )
}