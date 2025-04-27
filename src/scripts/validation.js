export function enableValidation(parameters){
    const {formSelector, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass } = parameters;
    
    /*Получили все формы со страницы*/
    const formList = Array.from(document.querySelectorAll(formSelector));

    /*Получили все поля из этих форм*/
    formList.forEach((formElement) => {
        setEventListeners(formElement, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass);
    });
};

/*Устанавливает обрабочик всем полям формы*/
function setEventListeners(formELement, inputClass, inpErrClass, errClass, submitButtonSelector, inactiveButtonClass,){
    const inputList = Array.from(formELement.querySelectorAll(inputClass));
    const buttonElement = formELement.querySelector(submitButtonSelector);
    inputList.forEach(function(input){
        input.addEventListener("input", function(evt){
            isValid(formELement, input, inpErrClass, errClass);
            toogleButtonState(inputList, buttonElement, inactiveButtonClass);
        })
    });
}

/*Валидация формы*/
function isValid(formELement, inputElement, inpErrClass, errClass){
    if(inputElement.validity.patternMismatch){
        showInputErrorMessage(formELement, inputElement, inputElement.dataset.errorMessage, inpErrClass, errClass);
        return;
    } 
    
    if(!inputElement.validity.valid) {
        showInputErrorMessage(formELement, inputElement, inputElement.validationMessage, inpErrClass, errClass);
    } else {
        hideInputErrorMessage(formELement, inputElement, inpErrClass, errClass);
    } 
}

function showInputErrorMessage(formElement, inputElement, errorMessage, inpErrClass, errClass){
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inpErrClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errClass);
}

export function hideInputErrorMessage(formElement, inputElement, inpErrClass, errClass){
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inpErrClass);
    errorElement.textContent = "";
    errorElement.classList.remove(errClass);
}

function hasInvalidSome(inputList) {
    return inputList.some(function(inputElement){
        return !inputElement.validity.valid;
    })
}

function toogleButtonState(inputList, buttonELement, disabledButtonClass){
    if(hasInvalidSome(inputList)){
        buttonELement.disabled = true;
        buttonELement.classList.add(disabledButtonClass);
    } else {
        buttonELement.disabled = false;
        buttonELement.classList.remove(disabledButtonClass);
    }
}

export function clearValidation(form, validationConfig) {
    const errorElements = form.querySelectorAll(`.${validationConfig.errorClass}`);
    /*Очистил поля span*/
    Array.from(errorElements).forEach(errElement => {
        errElement.classList.remove(validationConfig.errorClass);
        errElement.textContent = "";
    });
    const inputElements = Array.from(form.querySelectorAll(`${validationConfig.inputSelector}`));
    /*Очистилил поля input от текстак*/
    inputElements.forEach((inpElement) => {
        hideInputErrorMessage(form, inpElement, validationConfig.inpErrClass, validationConfig.errorClass)
    });
    const buttonSubmitFromForm = form.querySelector(validationConfig.submitButtonSelector);
    toogleButtonState(inputElements, buttonSubmitFromForm, validationConfig.inactiveButtonClass);
}

