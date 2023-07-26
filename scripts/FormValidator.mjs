
export default class FormValidator {
    constructor(data, formSelector) {
        this._formSelector = formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
    }

    enableValidation() {

        this._formSelector.addEventListener('submit', evt => evt.preventDefault());
        this._setEventListeners();
    }
    /* Создание слушателей при вводе в инпуты */
    _setEventListeners() {
        const inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
        const buttonElement = this._formSelector.querySelector(`.${this._submitButtonSelector}`);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement)
            })
        })
    }

    /* Проверка валидации инпута */
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
    /* Показ ошибки инпута */
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }
    /* Скрытие ошибки инпута */
    _hideInputError(inputElement) {
        const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }
    /* Деактивация/активация кнопки подтверждения при условии*/
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            this._toggleButtonActivity(buttonElement)
        }else{
            this.toggleButtonInactivity(buttonElement)
        }
    }
    /* Активация кнопки подтверждения */
    _toggleButtonActivity(buttonElement) {
        buttonElement.classList.remove(`${this._submitButtonSelector}_inactive`)
        buttonElement.classList.add(`${this._submitButtonSelector}_active`)
    }
    /* Деактивация кнопки подтверждения */
    toggleButtonInactivity(buttonElement) {
        buttonElement.classList.add(`${this._submitButtonSelector}_inactive`)
        buttonElement.classList.remove(`${this._submitButtonSelector}_active`)
    }
    /* Проверка всех инпутов для кнопки подтверждения */
    _hasInvalidInput(inputList) {
        return inputList.every((input) => input.validity.valid)
    }
}