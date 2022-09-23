import React from 'react';
import PopupWithForm from "./PopupWithForm";

export default function PopupWithConfirmation(props) {

   function handleSubmit(e) {
      e.preventDefault();
      props.onDeleteCard(props.card);
   }

   return (
      <PopupWithForm
         name='delete-card'
         title='Вы уверены?'
         isOpen={props.isOpen}
         onClose={props.onClose}
         buttonName={props.loading  ? 'Удаляем...' : 'Да'}
         onSubmit={handleSubmit}
      >
      </PopupWithForm>
   );
}