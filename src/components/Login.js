import React, { useState } from "react";

export default function Login({ onLogin }) {
   const [loginData, setLoginData] = useState({
      email: '',
      password: '',
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setLoginData(loginData =>({
         ...loginData,
         [name]: value,
      }));
   };

   const handleSubmit = (e) => {
      e.preventDefault()
      if (!loginData.password || !loginData.email) {
         return;
      }
      onLogin(loginData)
   }

   return (
      <form className="login"
         onSubmit={handleSubmit}>
         <h2 className="login__title">Вход</h2>
         <input autoComplete="on"
            className="login__email-input"
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            value={loginData.email}
            onChange={handleChange}
            minLength="2"
            maxLength="40"
            required />
         <input autoComplete="on"
            className="login__password-input"
            placeholder="Пароль"
            id="password"
            name="password"
            type="password"
            value={loginData.password}
            onChange={handleChange}
            minLength="2"
            maxLength="40"
            required />
         <button className="login__button"
            type="submit">Войти</button>
      </form>
   )
}