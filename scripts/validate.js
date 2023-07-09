/* Проверка валидации инпутов */
export function enableValidation({formSelector, ...rest}) {

    const getFormList = Array.from(document.querySelectorAll(formSelector));
    getFormList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();

        });
        setEventListeners(formElement, rest);
    })

}
/* Создание слушателей при вводе в инпуты */
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
/* Проверка валидации инпута */
function checkInputValidity(formElement, inputElement, ...rest) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, rest);
    } else {
        hideInputError(formElement, inputElement, rest);
    }
}
/* Показ ошибки инпута */
function showInputError(formElement, inputElement, errorMessage, {errorClass, inputErrorClass}) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}
/* Скрытие ошибки инпута */
function hideInputError(formElement, inputElement, {errorClass, inputErrorClass}) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}
/* Деактивация/активация кнопки подтверждения при условии*/
function toggleButtonState(inputList, buttonElement, submitButtonSelector) {
    if (hasInvalidInput(inputList)) {
        toggleButtonActivity(buttonElement, submitButtonSelector)
    }else{
        toggleButtonInactivity(buttonElement, submitButtonSelector)
    }
}
/* Активация кнопки подтверждения */
function toggleButtonActivity(buttonElement, submitButtonSelector) {
    buttonElement.classList.remove(`${submitButtonSelector}_inactive`)
    buttonElement.classList.add(`${submitButtonSelector}_active`)
}
/* Деактивация кнопки подтверждения */
export function toggleButtonInactivity(buttonElement, submitButtonSelector) {
    buttonElement.classList.add(`${submitButtonSelector}_inactive`)
    buttonElement.classList.remove(`${submitButtonSelector}_active`)
}
/* Проверка всех инпутов для кнопки подтверждения */
function hasInvalidInput(inputList) {
    return inputList.every((input) => input.validity.valid)
}