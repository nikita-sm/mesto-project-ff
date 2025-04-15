export function openPopup(popup){
    popup.classList.add("popup_is-opened");
    document.addEventListener("keyup", handleEscKeyUp);

}

/*Закрытие ажатием на крестик*/
export function closePopup(popup){
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keyup", handleEscKeyUp);
}

/*Закрытие при нажатии на ESC*/
function handleEscKeyUp(evt){
    evt.stopPropagation();
    if(evt.key === "Escape") {
        closePopup(document.querySelector(".popup_is-opened"));
    }
}
