export function createCard(item, template, deleteFn, likeFn, imageFn){
    const userTemplate = template.content;
    const cardElement = userTemplate.querySelector(".places__item").cloneNode(true);
    const imgCard = cardElement.querySelector(".card__image");
    imgCard.classList.add("popup-btn");
    const titleCard = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    deleteButton.addEventListener("click", function(evt){
      evt.stopPropagation();
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
