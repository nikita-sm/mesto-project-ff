export function openPopup(el){
    const currentPopupClass = el.getAttribute("data-popup");
    const  currentPopup = document.querySelector(`.${currentPopupClass}`);
    currentPopup.classList.add("popup_is-opened");
    const closeBtn = currentPopup.querySelector(".popup__close");

    const handleFormEditProfile= currentPopup.querySelector("[name=edit-profile]");
    
    //Если открыти форму с редактированием профиля, то заполнить поля данной формы данными из профиля
    if(handleFormEditProfile) {
        const nameInput = handleFormEditProfile["name"];
        const descriptionInput = handleFormEditProfile["description"];
    
        nameInput.value = document.querySelector(".profile__title").innerText;
        descriptionInput.value = document.querySelector(".profile__description").innerText;
    }
    /*Закрытие попапа на крестик*/
    closeBtn.addEventListener("click", function(){
        closePopup(currentPopup);
    });

    /*Закрытие попапа на ESC*/
    document.addEventListener("keydown", handleEscKeyUp);

    /*Закрытие попапа на Оверлей*/
    currentPopup.addEventListener("click", handlePopupOverlay);
}

/*Закрытие ажатием на крестик*/
export function closePopup(popup){
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("click", handleEscKeyUp);
}

/*Закрытие при нажатии на ESC*/
function handleEscKeyUp(evt){
    
    evt.stopPropagation();
    if(evt.key === "Escape") {
        closePopup(document.querySelector(".popup_is-opened"));
    }
}

/*Нажатие на оверлей*/
function handlePopupOverlay(evt){
    evt.stopPropagation();
    closePopup(evt.target);
}
