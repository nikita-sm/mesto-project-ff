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
const profile__description = document.querySelector(".profile__description")

function fillInputEditForm(form){
    const nameInput = form["name"];
    const descriptionInput = form["description"];
    
    nameInput.value = profile__title.innerText;
    descriptionInput.value = profile__description.innerText;
    
}