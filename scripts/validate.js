/* Проверка валидации инпутов */
export function enableValidation({formSelector, savePopUpProfile, savePopUpPlace, ...rest}) {

    const getFormList = Array.from(document.querySelectorAll(formSelector));
    getFormList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();

            if(formElement.classList.contains('popup__container_profile')){
                savePopUpProfile(evt)
            }else{
                savePopUpPlace(evt)
            }
        });
        setEventListeners(formElement, rest);
    })

}

function setEventListeners(formElement, {inputSelector, submitButtonSelector, ...rest}) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(`.${submitButtonSelector}`);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, rest);
            toggleButtonState(inputList, buttonElement, submitButtonSelector)
        })
    })
}

function checkInputValidity(formElement, inputElement, ...rest) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, rest);
    } else {
        hideInputError(formElement, inputElement, rest);
    }
}

function showInputError(formElement, inputElement, errorMessage, {errorClass, inputErrorClass}) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, {errorClass, inputErrorClass}) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}

function toggleButtonState(inputList, buttonElement, submitButtonSelector) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.remove(`${submitButtonSelector}_inactive`)
        buttonElement.classList.add(`${submitButtonSelector}_active`)
    }else{
        buttonElement.classList.add(`${submitButtonSelector}_inactive`)
        buttonElement.classList.remove(`${submitButtonSelector}_active`)
    }
}

function hasInvalidInput(inputList) {
    return inputList.every((input) => input.validity.valid)
}