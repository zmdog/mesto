/* Проверка кнопки */
function checkButtonState(inputs, formButton) {

    if (inputs.every((input) => checkInputValidity(input))) {
        formButton.classList.add(`popup__submit-button_active`)
        formButton.classList.remove(`popup__submit-button_inactive`)
    } else {
        formButton.classList.remove(`popup__submit-button_active`)
        formButton.classList.add(`popup__submit-button_inactive`)
    }
}

/* Проверка валидации инпутов */
export function checkFormError(inputs, formButton, input) {
    checkButtonState(inputs, formButton)
    checkInputState(input)
}

function checkInputValidity(input) {
    return input.validity.valid
}

function checkInputState(input) {
    const errorElement = input.closest('.popup__set').querySelector('.popup__input-error');
    if (checkInputValidity(input)) {
        errorElement.textContent = ''
    } else {
        errorElement.textContent = input.validationMessage
    }
}