import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(selector, handlerSubmit, replaceInputs) {
        super(selector);
        this._replaceInputs = replaceInputs
        this._handlerSubmit = handlerSubmit
        this._form = this.popup.querySelector('.popup__container')
    }

    _getInputValues() {
        this._popUpName = this._form.querySelector(".popup__edit[name='name']");
        this._popUpStatus = this._form.querySelector(".popup__edit[name='status']");
    }

    setEventListeners() {
        this._form.addEventListener('submit', this._handlerSubmit);

        super.setEventListeners()
    }

    removeEventListeners() {
        this._form.removeEventListener('submit', this._handlerSubmit)

        super.removeEventListeners()
    }

    open() {
        this._getInputValues()
        if (this._replaceInputs) {
            this._popUpName.value = this._replaceInputs().name.textContent
            this._popUpStatus.value = this._replaceInputs().status.textContent
        }
        super.open()
    }

    close() {
        this._form.reset()
        super.close()
    }
}