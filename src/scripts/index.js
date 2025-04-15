import "../pages/index.css";
import { initialCards} from "./cards";
import { createCard, deleteCard, handleLikeBtn } from "./card";
import {openPopup, closePopup} from "./modal";

/*Отрисовка 6-и карточек на странице*/
const list = document.querySelector(".places__list");
const template = document.querySelector("#card-template");
initialCards.forEach((item) => {
    list.append(createCard(item, template, deleteCard, handleLikeBtn, handleImageCard));
});


/*Поиск полей и описания*/
const profilTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

/*Поиск форм. Всего - 2 шт*/
const editForm = document.querySelector("[name=edit-profile]");
const addForm  = document.querySelector("[name=new-place]");

/*Поиск полей */
const inputNameFormNewCard = document.querySelector("[name=place-name]"); /*inputNameFormNewCard*/
const inputLinkFormNewCard = document.querySelector("[name=link]"); /*inputLinkFormNewCard*/

/*Попапы*/
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const closePopupButtons = document.querySelectorAll(".popup__close");
/*Поиск внутри попапа с картинкой*/
const imgInPopupImage = popupImage.querySelector(".popup__image");
const captionInPopupImage = popupImage.querySelector(".popup__caption");

/*Кнопки открытия попап и закрытие*/
const btnPopupEditProfile = document.querySelector(".profile__edit-button");
const btnPopupNewCard = document.querySelector(".profile__add-button");

/*Обработка клика на все оверлеи на странице + кнопка закрытия попапа*/

function handleCloseOverlayAndButton(){
    [popupEditProfile, popupNewCard, popupImage].forEach((el) => {
        el.addEventListener("click", function(evt){
            evt.stopPropagation();
            const classes = Array.from(evt.target.classList);
            if(classes.includes("popup_is-opened") || classes.includes("popup__close")) closePopup(evt.currentTarget);
        });
    })
}
handleCloseOverlayAndButton();

btnPopupEditProfile.addEventListener("click", function(evt){
    evt.stopPropagation();
    editForm.name.value = profilTitle.innerHTML;
    editForm.description.value = profileDescription.innerHTML;
    openPopup(popupEditProfile);
});

btnPopupNewCard.addEventListener("click", function(evt){
    evt.stopPropagation();
    openPopup(popupNewCard);
});



function handleFormEditProfile(evt) {
    evt.preventDefault();
    /* Заполнение полей формы */
    profilTitle.textContent = evt.target["name"].value;
    profileDescription.textContent = evt.target["description"].value;
    /* Закрытие попапа редактирования профиля */ 
    closePopup(popupEditProfile);
};

/*Обработка добавления новой карточки*/
function handleFormAddNewCard(evt) {
    evt.preventDefault();
    const item = {
        name: inputNameFormNewCard.value,
        link: inputLinkFormNewCard.value,
    };

    const newCard = createCard(item, template, deleteCard, handleLikeBtn, handleImageCard);
    newCard.querySelector(".popup-btn").addEventListener("click", function(){
        evt.stopPropagation();
        openPopup(popupImage);
    });
    list.insertBefore(newCard, list.firstChild);
    evt.target.reset();
    closePopup(popupNewCard);
}

/*Обработка и открытие попапа с картинкой*/
function handleImageCard(item) {
    imgInPopupImage.src = item.target.src;
    imgInPopupImage.alt = item.target.alt;
    captionInPopupImage.textContent = item.target.alt;
    openPopup(popupImage);
}

editForm.addEventListener("submit", handleFormEditProfile);
addForm.addEventListener("submit", handleFormAddNewCard);



