import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor({selector, handlerSubmit}) {
        super(selector);
        this._handler = handlerSubmit
        this._form = this.popup.querySelector('.popup__container')
        this._inputList = this._form.querySelectorAll('.popup__edit')
        this.formValues = {}
    }

    initialisationPopup() {
        this._handlerSubmit = () => {
            this._handler(this._getInputValues())
        }
        super.initialisationPopup();
        this.setEventListeners()
    }

    _getInputValues() {
        this._inputList.forEach(input => {
            this.formValues[input.name] = input.value;
        });
        return this.formValues;
    }

    setInputValues(data) {
        this._inputList.forEach(input => {
            input.value = data[input.name];
        });
    }

    setEventListeners() {
        this._form.addEventListener('submit', this._handlerSubmit);
        super.setEventListeners()
    }

    open() {
        super.open()
    }

    close() {
        this._form.reset()
        super.close()
    }
}