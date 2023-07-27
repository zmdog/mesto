export default class FormValidator {
    constructor(data, formSelector) {
        this._formSelector = formSelector;
        this._form = this._getFormSelector();
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this.submitActiveButtonSelector = data.submitActiveButtonSelector;
        this.submitInactiveButtonSelector = data.submitInactiveButtonSelector;
    }

    enableValidation() {
        this._setEventListeners();
    }

    checkValidation() {
        this._inputList.forEach((inputElement) => {
            this._checkValidaty(inputElement);
        })
    }

    /* Создание слушателей при вводе в инпуты */
    _setEventListeners() {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._buttonElement = this._form.querySelector(`.${this._submitButtonSelector}`);

        this._form.addEventListener('submit', evt => evt.preventDefault());
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkValidaty(inputElement)
            })
        })
    }

    _checkValidaty(inputElement) {
        this._checkInputValidity(inputElement);
        this.toggleButtonState()
    }

    _getFormSelector() {
        return document.querySelector(this._formSelector)
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
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    /* Скрытие ошибки инпута */
    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    /* Деактивация/активация кнопки подтверждения при условии*/
    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._toggleButtonActivity()
        } else {
            this._toggleButtonInactivity()
        }
    }

    /* Активация кнопки подтверждения */
    _toggleButtonActivity() {
        this._buttonElement.disabled = false
        this._buttonElement.classList.remove(this.submitInactiveButtonSelector)
        this._buttonElement.classList.add(this.submitActiveButtonSelector)
    }

    /* Деактивация кнопки подтверждения */
    _toggleButtonInactivity() {
        this._buttonElement.disabled = true
        this._buttonElement.classList.add(this.submitInactiveButtonSelector)
        this._buttonElement.classList.remove(this.submitActiveButtonSelector)
    }

    /* Проверка всех инпутов для кнопки подтверждения */
    _hasInvalidInput() {
        return this._inputList.every((input) => input.validity.valid)
    }
}