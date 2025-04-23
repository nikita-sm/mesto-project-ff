import { requestDeleteCard, requestPutLikeCard, requestDeleteLikeCard } from "./api";
export function createCard(item, template, deleteFn, likeFn, imageFn){
    const userTemplate = template.content;
    const cardElement = userTemplate.querySelector(".places__item").cloneNode(true);
    const imgCard = cardElement.querySelector(".card__image");
    imgCard.classList.add("popup-btn");
    const titleCard = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    /*Количество лайков*/
    const likeElement = cardElement.querySelector(".card__like-count");
    likeElement.textContent = item.likes.length;
    

    /*Проверка, если в базе данных мой лайк. Если есть, то присвоить класс card__like-button_is-active кнопке*/
    /* console.log(item.myId); */
    const isMyLikeHasInDatabase = item.likes.some(function(el){
      return el._id === item.myId;
    });
    if(isMyLikeHasInDatabase) {
      likeButton.classList.add("card__like-button_is-active");
    }
    
    /*=======*/
    deleteButton.addEventListener("click", function(evt){
      evt.stopPropagation();
      deleteFn(cardElement);
      requestDeleteCard(item._id);
    });

    /*Отрисовка кнокпи удаления, если карточка моя*/
    if(!item.isMyCard){
      deleteButton.remove();
    }
    /*===========*/

    likeButton.addEventListener("click", (evt) => {
      const classesLIkeBtn = Array.from(evt.target.classList);
      if(classesLIkeBtn.includes("card__like-button_is-active")) {
        requestDeleteLikeCard(item._id, likeElement);
      } else {
        requestPutLikeCard(item._id, likeElement);
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
  
  export function deleteCard(element, id){
    element.remove();
  }
  
  export function handleLikeBtn(evt){
    evt.target.classList.toggle("card__like-button_is-active");
  }
