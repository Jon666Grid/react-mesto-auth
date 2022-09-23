import { useEffect, useState, useContext } from 'react'
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {

   const currentUser = useContext(CurrentUserContext);
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');

   function handleNameChange(e) {
      setName(e.target.value);
   }

   function handleDescription(e) {
      setDescription(e.target.value);
   }

   useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
   }, [currentUser, props.isOpen]);

   function handleSubmit(e) {
      e.preventDefault();
      props.onUpdateUser({
         name : name,
         about: description,
      });
   }

   return (
      <PopupWithForm
         name="edit"
         title="Редактировать профиль"
         buttonName={props.loading  ? 'Сохраняем...' : 'Сохранить профиль'}
         isOpen={props.isOpen}
         onClose={props.onClose}
         onSubmit={handleSubmit}
      >
         <label className="popup__label">
            <input required type="text"
               name="name"
               minLength="2"
               maxLength="40"
               placeholder="Имя"
               id="input-name"
               className="popup__input popup__input_type_name"
               value={ name || ''}
               onChange={handleNameChange} />
            <span className="popup__error"
               id="input-name-error"></span>
         </label>
         <label className="popup__label">
            <input required type="text"
               name="about"
               minLength="2"
               maxLength="200"
               placeholder="О себе"
               id="input-profession"
               className="popup__input  popup__input_type_profession"
               value={ description || ''}
               onChange={handleDescription} />
            <span className="popup__error"
               id="input-profession-error"></span>
         </label>
      </PopupWithForm>
   );
}