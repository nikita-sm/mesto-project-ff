/*Базовая конфигурация*/
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-36",
  headers: {
    authorization: '4b69a0c0-a05b-4d1b-831f-c7aa3eb401d3',
    'Content-Type': 'application/json'
  }
}

function handleResposneServer(resposneServer){
  if(resposneServer.ok) {
    return resposneServer.json();
  };
  return Promise.reject(`Ошибка ${resposneServer.status}`);
}
/*Запрос на получение инфомации о пользователе*/
export  const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "GET"
  }).then(handleResposneServer)
};

/*Запрос на получение карточек с сервера*/
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "GET"
  }).then(handleResposneServer);
};

export const requestProfileAndCards = () => {
  return Promise.all([getUserInfo(), getInitialCards()])
}

/*Запрос на обновления данных в профиле*/
export function requestUpdateProfile(name, about, ){
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,  
        method: 'PATCH',
        body: JSON.stringify({
          name,
          about,
        }),
      }).then(handleResposneServer);
}

/*Запрос на добавление новой карточки*/
export function requestNewCard(name, link){
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,  
    method: 'POST',
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(handleResposneServer);
}

/*Запрос на удаление текущей карточки. Вызов в файле card.js*/
export function requestDeleteCard(id){
  return fetch(`${config.baseUrl}/cards/${id}`, {
    headers: config.headers,  
    method: 'DELETE',
    body: JSON.stringify({
     id
    }),
  }).then(handleResposneServer);
};


export function requestPutLikeCard(id){
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    headers: config.headers,  
    method: 'PUT',
    body: JSON.stringify({
     id
    }),
  }).then(handleResposneServer);
}

export function requestDeleteLikeCard(id){
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    headers: config.headers,  
    method: 'DELETE',
    body: JSON.stringify({
     id
    }),
  }).then(handleResposneServer);
};

export function requestUpdateAvatar(url){
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,  
    method: 'PATCH',
    body: JSON.stringify({
      avatar: url,
    }),
  }).then(handleResposneServer);
};
  
