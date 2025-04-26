import { requestDeleteCard, requestPutLikeCard, requestDeleteLikeCard } from "./api";

export function createCard(item, template, deleteFn, likeFn, imageFn){
  const userTemplate = template.content;
  const cardElement = userTemplate.querySelector(".places__item").cloneNode(true);
  const imgCard = cardElement.querySelector(".card__image");
  imgCard.classList.add("popup-btn");
  const titleCard = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeElement = cardElement.querySelector(".card__like-count");
  likeElement.textContent = item.likes.length;
  deleteButton.addEventListener("click", function(evt){
    evt.stopPropagation();
    deleteFn(cardElement);
    requestDeleteCard(item._id)
      .then(result => {
        deleteFn(cardElement);
      })
      .catch(err => {
        console.log("Ошибка удаления карточки");
      })
      .finally(() => {
        console.log("Выполнение при удалении карточки");
      })
  });
  if(item.myId !== item.owner._id) {
    deleteButton.style.display = "none";
  }

  const isMyLikeHasInDatabase = item.likes.some(function(el){
    return el._id === item.myId;
  });
  if(isMyLikeHasInDatabase) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", (evt) => {
    if(!evt.target.classList.contains("card__like-button_is-active")) {
      requestPutLikeCard(item._id)
      .then(result => {
        likeElement.textContent = result.likes.length;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        console.log("Добавление лайка на карточку");
      });
    } else {
      requestDeleteLikeCard(item._id)
      .then(result => {
        likeElement.textContent = result.likes.length;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        console.log("Удаление лайка на карточку");
      });
    }
   likeFn(evt);
  });
  imgCard.addEventListener("click", imageFn)
  const name = item.name;
  const link = item.link;
  imgCard.src = link;
  imgCard.alt = item.name;
  imgCard.setAttribute("loading", "lazy");
  titleCard.textContent = name;
  return cardElement;
}
  
  export function deleteCard(element){
    element.remove();
  }
  
  export function handleLikeBtn(evt){
    evt.target.classList.toggle("card__like-button_is-active");
  }
