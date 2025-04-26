import "../pages/index.css";
import { initialCards} from "./cards";
import { createCard, deleteCard, handleLikeBtn } from "./card";
import {openPopup, closePopup} from "./modal";

import { enableValidation, clearValidation } from "./validation";

import {requestProfileAndCards, requestUpdateProfile, requestNewCard, requestUpdateAvatar } from "./api";


const baseText = "Сохранить";
const textAfterStartRequest = "Сохранение...";

/*Отрисовка 6-и карточек на странице*/
export const list = document.querySelector(".places__list");
export const template = document.querySelector("#card-template");
/* initialCards.forEach((item) => {
    list.append(createCard(item, template, deleteCard, handleLikeBtn, handleImageCard));
});
 */

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}



/*Поиск полей и описания*/
const profilTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector('.profile__image');

const clearConfig = {
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
}

/*Поиск форм. Всего - 2 шт*/
const editForm = document.querySelector("[name=edit-profile]");
const addForm  = document.querySelector("[name=new-place]");
const updateAvatar = document.querySelector("[name=update-avatar]");

/*Поиск полей */
const inputNameFormNewCard = document.querySelector("[name=place-name]");
const inputLinkFormNewCard = document.querySelector("[name=link]");
const inputAvatarProfile = document.querySelector("[name=profile-avatar]");

/*Попапы*/
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupUpdateAvatar = document.querySelector(".popup_type_update-avatar");

/*Кнопки сохранить внутри попапов*/
const btnSaveNewCard = popupNewCard.querySelector(".popup__button");
const btnSaveUpdateAvatar = popupUpdateAvatar.querySelector(".popup__button"); 
const btnSaveUpdateProfile = popupEditProfile.querySelector(".popup__button");

/* const closePopupButtons = document.querySelectorAll(".popup__close"); */
/*Поиск внутри попапа с картинкой*/
const imgInPopupImage = popupImage.querySelector(".popup__image");
const captionInPopupImage = popupImage.querySelector(".popup__caption");

/*Кнопки открытия попап и закрытие*/
const btnPopupEditProfile = document.querySelector(".profile__edit-button");
const btnPopupNewCard = document.querySelector(".profile__add-button");
const btnpAvatarProfile = document.querySelector(".profile__image");
/*Обработка клика на все оверлеи на странице + кнопка закрытия попапа*/

function handleCloseOverlayAndButton(){
    [popupEditProfile, popupNewCard, popupImage, popupUpdateAvatar].forEach((el) => {
        el.addEventListener("click", function(evt){
            evt.stopPropagation();
            const classes = Array.from(evt.target.classList);
            if(classes.includes("popup_is-opened") || classes.includes("popup__close")) {
                closePopup(evt.currentTarget);
            }
        });
    })
}
handleCloseOverlayAndButton();

btnPopupEditProfile.addEventListener("click", function(evt){
    evt.stopPropagation();
    editForm.name.value = profilTitle.textContent;
    editForm.description.value = profileDescription.textContent;
    openPopup(popupEditProfile);
    clearValidation(editForm, {
        ...clearConfig,
        title: profilTitle.textContent,
        description: profileDescription.textContent,
    });
});

btnPopupNewCard.addEventListener("click", function(evt){
    evt.stopPropagation();
    openPopup(popupNewCard);
    clearValidation(addForm, clearConfig);
});

btnpAvatarProfile.addEventListener("click", function(evt) {
    evt.stopPropagation();
    openPopup(popupUpdateAvatar);
});

function handleFormEditProfile(evt) {
    evt.preventDefault();
    /* Заполнение полей формы */
    const name = evt.target["name"].value; /*Новая*/
    const description = evt.target["description"].value; /*Новая*/
    profilTitle.textContent = name;
    profileDescription.textContent = description;

    btnSaveUpdateProfile.textContent = textAfterStartRequest;
    /*Обновление данных профиля на сервере*/
    requestUpdateProfile(name, description)
        .then(({name, about}) => {
            profilTitle.textContent = name;
            profileDescription.textContent = about;
        })
        .catch(err => {
            console.log("Ошибка редактирования профиля");
        })
        .finally(() => {
            btnSaveUpdateProfile.textContent = baseText;
            closePopup(popupEditProfile);
        })

    /* Закрытие попапа редактирования профиля */ 
    
};

/*Обработка добавления новой карточки*/
function handleFormAddNewCard(evt) {
    evt.preventDefault();
    const name = inputNameFormNewCard.value;
    const link = inputLinkFormNewCard.value
    evt.target.reset();
    /*Закрытие попапа*/
    closePopup(popupNewCard);
    btnSaveNewCard.textContent = textAfterStartRequest;
    /*Запрос на сервер  - добавление новой карточки*/
    requestNewCard(name, link)
        .then(result => {
            const myId = result.owner._id;
            const cardWithMyId = {
                ...result,
                myId,
            };
            list.insertBefore(createCard(cardWithMyId, template, deleteCard, handleLikeBtn, handleImageCard), list.firstChild)
        })
        .catch((err) => {
            console.log("Ошибка добавления новой карточки");
        })
        .finally(() => {
            btnSaveNewCard.textContent = baseText;
            closePopup(popupNewCard);
        });
}

/*Обработка и открытие попапа с картинкой*/
export function handleImageCard(item) {
    imgInPopupImage.src = item.target.src;
    imgInPopupImage.alt = item.target.alt;
    captionInPopupImage.textContent = item.target.alt;
    openPopup(popupImage);
}

function handleUpdateAvatar(evt) {
    evt.preventDefault();
    
    btnSaveUpdateAvatar.textContent = textAfterStartRequest;
    requestUpdateAvatar(inputAvatarProfile.value)
        .then(({avatar}) => {
            profileImage.style.backgroundImage = `url(${avatar})`;
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            btnSaveUpdateAvatar.textContent = baseText;
            closePopup(popupUpdateAvatar);
        });
    
}



editForm.addEventListener("submit", handleFormEditProfile);
addForm.addEventListener("submit", handleFormAddNewCard);
updateAvatar.addEventListener("submit", handleUpdateAvatar);

/*7 спринт*/

enableValidation(validationConfig);


/*Запросы Пользователя и списка карточек*/
requestProfileAndCards()
    .then(([userInfo, cards]) => {
        console.log(userInfo, "  ===> Это мои персональные данные");
        console.log("==============");
        const myId = userInfo._id;
        /*Отображение данных профиля*/
        const {name, about, avatar} = userInfo;
        profilTitle.textContent = name;
        profileDescription.textContent = about;
        profileImage.style.backgroundImage = `url(${avatar})`;

        /*Отображение карточек на странице*/
        cards.forEach((card) => {
            const cardWithMyId = {
                ...card,
                myId,
            };
            list.append(createCard(cardWithMyId, template, deleteCard, handleLikeBtn, handleImageCard));
        })
    })
    .catch((err) => {
        console.log("Ошибка при отрисовки списка карточке и получения данных");
    })
    .finally(() => {
        console.log("Этот код выполняется в любом случае");
    })


