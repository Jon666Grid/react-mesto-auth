import { useEffect, useState, useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {

   const currentUser = useContext(CurrentUserContext);

   const [name, setName] = useState('');
   const [link, setLink] = useState('');

   function handleNameChange(e) {
      setName(e.target.value);
   }

   function handleLinkChange(e) {
      setLink(e.target.value);
   }

   useEffect(() => {
      setName('');
      setLink('');
   }, [currentUser, props.isOpen]);

   function handleSubmit(e) {
      e.preventDefault();
      props.onUpdateCard({
         name : name,
         link : link,
      });
   }

   return (
      <PopupWithForm
         name='new-card'
         title='Новое место'
         isOpen={props.isOpen}
         onClose={props.onClose}
         onSubmit={handleSubmit}
         buttonName={props.loading  ? 'Добавляем...' : 'Добавить карточку'}
      >
         <label className="popup__label">
            <input required type="text"
               name="name" minLength="2"
               maxLength="30"
               placeholder="Название"
               id="input-area"
               className="popup__input popup__input_type_area"
               value={name} 
               onChange={handleNameChange} />
            <span className="popup__error"
               id="input-area-error"></span>
         </label>
         <label className="popup__label">
            <input required type="url"
               name="link"
               placeholder="Ссылка на картинку"
               id="input-link"
               className="popup__input popup__input_type_img"
               value={link}
               onChange={handleLinkChange} />
            <span className="popup__error"
               id="input-link-error"></span>
         </label>
      </PopupWithForm>
   );
}