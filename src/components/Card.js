import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {

   const currentUser = useContext(CurrentUserContext);
   const isOwn = card.owner._id === currentUser._id;
   const isLiked = card.likes.some(i => i._id === currentUser._id);

   const cardDeleteButtonClassName = (
      `card__del-button ${isOwn ? '' : 'card__del-button_hidden'}`
   );

   const cardLikeButtonClassName = (
      `card__like-button ${isLiked ? 'card__like-active' : ''}`
   );

   function handleCardClick() {
      onCardClick(card);
   }

   function handleLikeClick() {
      onCardLike(card);
   }

   function handleDeleteClick() {
      onCardDelete(card);
   }

   return (
      <section className="card-template">
         <li className="card">
            <img src={card.link} alt={card.name}
               className="card__img"
               onClick={handleCardClick} />
            <div className="card__flex">
               <h2 className="card__title">{card.name}</h2>
               <div className="card__like-container">
                  <button className={cardLikeButtonClassName}
                     onClick={handleLikeClick}
                     type="button"></button>
                  <span className="card__like-counter">{card.likes.length}</span>
               </div>
               <button className={cardDeleteButtonClassName}
                  onClick={handleDeleteClick}
                  type="button"></button>
            </div>
         </li>
      </section>
   )
}