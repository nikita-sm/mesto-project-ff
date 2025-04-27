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
    handleDeleteServerResponse(item._id, cardElement, deleteFn);
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
    handleLikeServerResponse(item._id, evt, likeElement, likeFn);
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

function handleDeleteServerResponse(id, cardElement, deleteFn) {
  requestDeleteCard(id)
    .then(result => {
      deleteFn(cardElement);
    })
    .catch(err => {
      console.log("Ошибка удаления карточки");
    })
    .finally(() => {
      console.log("Выполнение функции при удалении карточки");
    })
};

function handleLikeServerResponse(id, evt, likeELement, handleLikeBtn){
  const isLiked = evt.target.classList.contains("card__like-button_is-active");
  const likeMethod = isLiked ? requestDeleteLikeCard : requestPutLikeCard;
  likeMethod(id)
    .then(result => {
      handleLikeBtn(evt);
      likeELement.textContent = result.likes.length;
    }) 
    .catch(err => {
      console.log("Ошибка при лайке");
    })
    .finally(() => {
      console.log("Код выполнения после получения лайка");
    });
}