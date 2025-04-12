const template = document.querySelector("#card-template");

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export function createCard(item, template, deleteFn, likeFn, imageFn){
  const userTemplate = template.content;
  const cardElement = userTemplate.querySelector(".places__item").cloneNode(true);
  const imgCard = cardElement.querySelector(".card__image");
  imgCard.classList.add("popup-btn");
  imgCard.setAttribute("data-popup", "popup_type_image");
  const titleCard = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  deleteButton.addEventListener("click", function(){
    deleteFn(cardElement);
  });
  likeButton.addEventListener("click", likeFn);
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

