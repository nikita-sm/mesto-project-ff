import { initialCards, createCard, deleteCard, handleLikeBtn } from "./cards";

import "../pages/index.css";

// @todo: Темплейт карточки
/* const template = document.querySelector("#card-template"); */


// @todo: DOM узлы
const list = document.querySelector(".places__list");


// @todo: Функция создания карточки
/* function createCard(item, fn, likeFn, imageFn){
    const userTemplate = template.content;
    const cardElement = userTemplate.querySelector(".places__item").cloneNode(true);
    const imgCard = cardElement.querySelector(".card__image");
    const titleCard = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    deleteButton.addEventListener("click", function(){
       fn(cardElement);
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
} */

// @todo: Функция удаления карточки
/* function deleteCard(element){
    element.remove();
} */

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    list.append(createCard(item, deleteCard, handleLikeBtn, handleImageCard));
});


/*6 Спринт*/

const popups = {
    "card__image": "popup_type_image",
    "profile__edit-button": "popup_type_edit",
    "profile__add-button": "popup_type_new-card"
}

Object.keys(popups).forEach(function(elements){
    [...document.querySelectorAll(`.${elements}`)].forEach(function(item){
        item.addEventListener("click", function(el){
            el.preventDefault();
            openPopup(el);
        })
    });
});


/*Функция открытия попап*/
function openPopup(btn){
    const btnClass = btn.target.classList[0];
    const popupElement = document.querySelector(`.${popups[btnClass]}`);
    popupElement.classList.add("popup_is-opened");

    const editProfileForm = popupElement.querySelector("[name=edit-profile]");
    if(editProfileForm) {
        fillInputEditForm(editProfileForm);
    }

    handleClosePopupButton(popupElement);

    handlePopupOverlay(popupElement);

    document.addEventListener("keyup", handleEscKeyUp)
}

function handleEscKeyUp(evt){
    evt.stopPropagation();
    if(evt.key === "Escape") {
        const popup = document.querySelector(".popup_is-opened");
        closePopup(popup);
    }
}

/*Нажатие на кнопку закрытие -  крестик*/
function handleClosePopupButton(popup){
    popup.querySelector(".popup__close").addEventListener("click", function(){
        closePopup(popup);
    });
}

/*Нажатие на оверлей*/
function handlePopupOverlay(popup){
    popup.addEventListener("click", function(evt) {
        evt.stopPropagation();
        const arrayClasses = Array.from(evt.target.classList);
        if(arrayClasses.includes("popup")){
            closePopup(popup);
        }
    });
}

function closePopup(element){
    element.classList.remove("popup_is-opened");
    document.removeEventListener("keyup", handleEscKeyUp);

}

/*Находим форму*/

const profile__title = document.querySelector(".profile__title");
const profile__description = document.querySelector(".profile__description");

function fillInputEditForm(form){
    const nameInput = form["name"];
    const descriptionInput = form["description"];
    
    nameInput.value = profile__title.innerText;
    descriptionInput.value = profile__description.innerText;
    
}

const editForm = document.querySelector("[name=edit-profile]");
const addForm  = document.querySelector("[name=new-place]");

function handleFormSubmitEdit(evt) {
    evt.preventDefault();
    document.querySelector(".profile__title").textContent = evt.target["name"].value;
    document.querySelector(".profile__description").textContent = evt.target["description"].value;
    closePopup(evt.target.closest(".popup_type_edit"));
};

function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    const name = evt.target.querySelector("[name=place-name]");
    const link = evt.target.querySelector("[name=link]");
    const item = {
        name: name.value,
        link: link.value
    };
    list.insertBefore(createCard(item, deleteCard, handleLikeBtn, handleImageCard), list.firstChild);
    name.value = "";
    link.value = "";
    closePopup(evt.target.closest(".popup_type_new-card"));
}

editForm.addEventListener("submit", handleFormSubmitEdit);
addForm.addEventListener("submit", handleFormSubmitAdd);



/* function handleLikeBtn(evt){
    evt.target.classList.toggle("card__like-button_is-active");
} */


function handleImageCard(evt) {
    const popup = document.querySelector(".popup_type_image");
    const img = popup.querySelector(".popup__image");
    const caption = popup.querySelector(".popup__caption");
    img.src = evt.target.src;
    img.alt = evt.target.alt;
    caption.textContent = evt.target.alt;
    
}



