// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;
const clone = template.cloneNode(true);


// @todo: DOM узлы
const list = document.querySelector(".places__list");


// @todo: Функция создания карточки
function createCard(item, fn){
    const clone = template.cloneNode(true);
    const li = clone.querySelector(".places__item");
    let imgCard = li.querySelector(".card__image");
    let titleCard = li.querySelector(".card__title");
    let deleteButton = li.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", function(){
       deleteCard(deleteButton);
    })
    const name = item.name;
    const link = item.link;
    imgCard.src = link;
    imgCard.alt = "Изображение";
    imgCard.setAttribute("loading", "lazy");
    titleCard.textContent = name;
    list.append(clone);
}

// @todo: Функция удаления карточки
function deleteCard(deleteButton){
    let card = deleteButton.closest(".places__item");
    card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    createCard(item, deleteCard);
})
