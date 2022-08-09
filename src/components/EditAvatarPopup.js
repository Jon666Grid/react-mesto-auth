import { useRef, useEffect } from 'react'
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
   const ref = useRef();

   function handleSubmit(e) {
      e.preventDefault();
      props.onUpdateAvatar({
         avatar: ref.current.value,
      });
   }

   useEffect(() => {
      ref.current.value = '';
   }, [props.isOpen]);

   return (
      <PopupWithForm
         name='avatar'
         title='Обновить аватар'
         buttonName={props.loading  ? 'Обновляем...' : 'Сохранить'}
         isOpen={props.isOpen}
         onClose={props.onClose}
         onSubmit={handleSubmit}
      >
         <label className="popup__label">
            <input required type="url"
               ref={ref}
               name="avatar"
               placeholder="Ссылка на картинку"
               id="avatar"
               className="popup__input popup__input_type_img" />
            <span className="popup__error"
               id="input-avatar-error"></span>
         </label>
      </PopupWithForm>
   );
}