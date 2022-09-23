class Api {
   constructor(data) {
      this._url = data.url;
      this._headers = data.headers;
   }

   _checkResponse(res) {
      if (res.ok)
         return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
   }

   getInitialCards() {
      return fetch(`${this._url}/cards`, {
         headers: this._headers
      }).then(res => this._checkResponse(res));
   }

   getUserInfo() {
      return fetch(`${this._url}/users/me`, {
         headers: this._headers
      }).then(res => this._checkResponse(res));
   }

   changeInfo(data) {
      return fetch(`${this._url}/users/me`, {
         method: "PATCH",
         headers: this._headers,
         body: JSON.stringify({
            name: data.name,
            about: data.about,
         }),
      }).then(this._checkResponse);
   }

   addCard(data) {
      return fetch(`${this._url}/cards`, {
         method: "POST",
         headers: this._headers,
         body: JSON.stringify({
            name: data.name,
            link: data.link
         })
      }).then(this._checkResponse);
   }

   changeLikeCardStatus(id, isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
         method: isLiked ? "PUT" : "DELETE",
         headers: this._headers,
      }).then(this._checkResponse);
   }

   changeAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
         method: "PATCH",
         headers: this._headers,
         body: JSON.stringify({
            avatar: data.avatar,
         }),
      }).then(this._checkResponse);
   }

   deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`, { 
         method: "DELETE",
         headers: this._headers
      }).then(this._checkResponse);
   }

}

const api = new Api({
   url: 'https://mesto.nomoreparties.co/v1/cohort-43',
   headers: {
      authorization: '2b06c501-6ac3-4929-adad-4a2d77e5d578',
      'Content-Type': 'application/json'
   }
});

export default api;