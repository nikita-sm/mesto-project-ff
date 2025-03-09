// @todo: Темплейт карточки
const template = document.querySelector("#card-template");



// @todo: DOM узлы
const list = document.querySelector(".places__list");


// @todo: Функция создания карточки
function createCard(item, fn){
    const userTemplate = template.content;
    const cardElement = userTemplate.querySelector(".places__item").cloneNode(true);
    const imgCard = cardElement.querySelector(".card__image");
    const titleCard = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", function(){
       fn(cardElement);
    })
    const name = item.name;
    const link = item.link;
    imgCard.src = link;
    imgCard.alt = item.name;
    imgCard.setAttribute("loading", "lazy");
    titleCard.textContent = name;
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(element){
    element.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    list.append(createCard(item, deleteCard));
})
