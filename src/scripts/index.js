import "../pages/index.css";
import { initialCards, createCard, deleteCard, handleLikeBtn } from "./cards";
import {openPopup, closePopup} from "./modal";


const list = document.querySelector(".places__list");
const template = document.querySelector("#card-template");

/*Поиск полей и описания*/
const profilTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

/*Поиск форм. Всего - 2 шт*/
const editForm = document.querySelector("[name=edit-profile]");
const addForm  = document.querySelector("[name=new-place]");

/*Поиск полей */
const name = document.querySelector("[name=place-name]");
const link = document.querySelector("[name=link]");

/*Попап с картинкой*/
const popupImage = document.querySelector(".popup_type_image");


/*Отрисовка 6-и карточек на странице*/
initialCards.forEach((item) => {
    list.append(createCard(item, template, deleteCard, handleLikeBtn, handleImageCard));
});

function initHandleClick(){
    const popupBtns = document.querySelectorAll(".popup-btn");
    Array.from(popupBtns).forEach(function(btn){
        btn.addEventListener("click", function(evt){
            evt.preventDefault();
            openPopup(evt.target);
        });
    });
};

initHandleClick();

function handleFormEditProfile(evt) {
    evt.preventDefault();
    profilTitle.textContent = evt.target["name"].value;
    profileDescription.textContent = evt.target["description"].value;
    closePopup(evt.target.closest(".popup_type_edit"));
};

function handleFormAddNewCard(evt) {
    evt.preventDefault();

    const item = {
        name: name.value,
        link: link.value
    };

    const newCard = createCard(item, template, deleteCard, handleLikeBtn, handleImageCard);
    newCard.querySelector(".popup-btn").addEventListener("click", function(evt){
        openPopup(evt.target);
    });
    list.insertBefore(newCard, list.firstChild);
    evt.target.reset();
    closePopup(evt.target.closest(".popup_type_new-card"));
}

function handleImageCard(evt) {
    const imgInPopupImage = popupImage.querySelector(".popup__image");
    const captionInPopupImage = popupImage.querySelector(".popup__caption");
    imgInPopupImage.src = evt.target.src;
    imgInPopupImage.alt = evt.target.alt;
    captionInPopupImage.textContent = evt.target.alt;
}

editForm.addEventListener("submit", handleFormEditProfile);
addForm.addEventListener("submit", handleFormAddNewCard);



