import { list, template } from "./index";
import { createCard, deleteCard, handleLikeBtn } from "./card";
import { handleImageCard } from "./index";
const promise1 = fetch("https://nomoreparties.co/v1/wff-cohort-36/users/me", {
    headers: {
         authorization: '4b69a0c0-a05b-4d1b-831f-c7aa3eb401d3',
         method: "GET"
    }
});

const promise2 = fetch("https://nomoreparties.co/v1/wff-cohort-36/cards", {
    headers: {
         authorization: '4b69a0c0-a05b-4d1b-831f-c7aa3eb401d3',
         method: "GET"
    }
});

export function requestProfileAndCards(titleProfile, descriptionProfile, logoProfile, list, createCard, template, deleteCard, handleLikeBtn, handleImageCard ){
    Promise.all([promise1, promise2])
        .then(res => {
          const allOk = res.every(response => response.ok);
          if(!allOk) {
            throw new Error('Где-то в промисах ошибка');
          }
          return Promise.all(res.map(res => res.json()));
            
        })
        .then(data => {
            const myId = data[0]._id;
            /* console.log(myId); */
            /*Начало отрисовки данных в профиле*/
            const {name, about, avatar} = data[0];
            titleProfile.textContent = name;
            descriptionProfile.textContent = about;
            logoProfile.style.backgroundImage = `url(${avatar})`;
            /*Конец отрисовки данных в профиле*/

            /*Отрисовка карточек на странице*/
            console.log(data);
            data[1]
            .map(({name, link, likes, owner, _id}) => {
                const isMyCard = myId === owner._id
                return {
                    name, 
                    link,
                    likes,
                    isMyCard,
                    _id,
                    myId,
                }
            })
            .forEach(function(item){
                list.append(createCard(item, template, deleteCard, handleLikeBtn, handleImageCard));
            });
        })
        .catch(err => {
          console.log(err);
        })
}

export function requestUpdateProfile(name, about, btnElement){
    btnElement.textContent = "Сохранение...";
    fetch('https://nomoreparties.co/v1/wff-cohort-36/users/me', {
        method: 'PATCH',
        headers: {
          authorization: '4b69a0c0-a05b-4d1b-831f-c7aa3eb401d3',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(res => {
        btnElement.textContent = "Сохранено";
        /* console.log(res) */
      })
      .catch(err => {
        console.log(err)
      })
}

export function requestNewCard(name, link, btnElement){
    btnElement.textContent = "Сохранение...";
    fetch('https://nomoreparties.co/v1/wff-cohort-36/cards', {
        method: 'POST',
        headers: {
          authorization: '4b69a0c0-a05b-4d1b-831f-c7aa3eb401d3',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          link: link,
        })
      })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(res => {
        btnElement.textContent = "Сохранить";
        const newItem = {
          name, 
          link,
          likes: [],
          isMyCard: true,
          _id: res._id,
          myId: res.owner._id,
        };
        const newCard = createCard(newItem, template, deleteCard, handleLikeBtn, handleImageCard);
        list.insertBefore(newCard, list.firstChild);
      })
      .catch(err => {
        console.log(err);
      })
}

/*Импорт этой функции будет внутри card.js*/
export function requestDeleteCard(id){
  fetch(`https://nomoreparties.co/v1/wff-cohort-36/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: '4b69a0c0-a05b-4d1b-831f-c7aa3eb401d3',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if(res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err

    );
  })
}

export function requestPutLikeCard(id, likeElement){
  fetch(`https://nomoreparties.co/v1/wff-cohort-36/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: '4b69a0c0-a05b-4d1b-831f-c7aa3eb401d3',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    return res.json();
  })
  .then(res => {
    const likeCount = res.likes.length;
    likeElement.textContent = likeCount;
  })
}

export function requestDeleteLikeCard(id, likeElement){
  fetch(`https://nomoreparties.co/v1/wff-cohort-36/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: '4b69a0c0-a05b-4d1b-831f-c7aa3eb401d3',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    return res.json();
  })
  .then(res => {
    console.log(res);
    const likeCount = res.likes.length;
    likeElement.textContent = likeCount;
  })
};

export function requestUpdateAvatar(url, logoProfile, btnElement){
  btnElement.textContent = "Сохранение...";
  fetch(`https://nomoreparties.co/v1/wff-cohort-36/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: '4b69a0c0-a05b-4d1b-831f-c7aa3eb401d3',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: url,
    })
  })
  .then(res => {
    return res.json();
  })
  .then(res => {
    btnElement.textContent = "Сохранение";
    logoProfile.style.backgroundImage = `url(${url})`;
  })
};
  
