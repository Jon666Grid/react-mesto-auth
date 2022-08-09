export default function InfoTooltip(props) {

   const isOpenPopup = props.isOpen && 'popup_is_opened';

   return (
      <div className={`popup ${isOpenPopup}`}>
         <div className="popup__container-info">
            <div className={`popup__status ${props.isSuccess ? 'popup__status_success' : 'popup__status_fail'}`}></div>
            <h3 className="popup__title popup__title_info">{props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h3>
            <button className="popup__button popup__button_info"
               type="button"
               onClick={props.onClose}></button>
         </div>
      </div>
   );
}