export default function PopupWithForm(props) {

   const openedClass = props.isOpen && 'popup_is_opened';

   return (
      <div className={`popup popup_type_${props.name} ${openedClass}`}>
         <form className={`popup__form form-${props.name}`}
            name="myForm"
            noValidate
            onSubmit={props.onSubmit}>
            <h3 className="popup__profile">
               {props.title}</h3>
            {props.children}
            <button type="submit"
               className="popup__submit-btn">
               {props.buttonName}
            </button>
            <button className={`popup__button popup__button_${props.name}`}
               type="button"
               onClick={props.onClose}>
            </button>
         </form>
      </div>
   );
}