import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card'

export default function Main(props) {

   const currentUser = useContext(CurrentUserContext);

   return (
      <main className="content">

         <section className="profile">
            <button className="profile__avatar-edit"
               type="button" title="Обновить аватар"
               onClick={props.onEditAvatar}>
               <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
            </button>
            <div className="profile__info">
               <h1 className="profile__info-name">{currentUser.name}</h1>
               <button className="profile__button"
                  type="button"
                  onClick={props.onEditProfile}></button>
               <p className="profile__info-profession">{currentUser.about}</p>
            </div>
            <button className="profile__add-button"
               type="button"
               onClick={props.onAddPlace}></button>
         </section>

         <section className="elements">
            <ul className="elements__list">
               {props.сards.map((item) => (
                  <Card
                     card={item}
                     key={item._id}
                     onCardClick={props.onCardClick}
                     onCardLike={props.onCardLike}
                     onCardDelete={props.onCardDelete}
                  />
               ))}
            </ul>
         </section>

      </main>
   );
}

