export default function ImagePopup(props) {

   const isOpenPopup = props.card.name && 'popup_is_opened';

   return (
      <div className={`popup ${isOpenPopup}`}>
         <div className="popup__container-img">
            <img src={props.card.link}
               alt={props.card.name}
               className="popup__img" />
            <h3 className="popup__title">{props.card.name}</h3>
            <button className="popup__button popup__button_img"
               type="button"
               onClick={props.onClose}></button>
         </div>
      </div>
   );
}