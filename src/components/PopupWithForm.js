import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor({selector, handlerSubmit}) {
        super(selector);
        /* Для передачи параметра(функции) делаю привязку с параметром к пустому контексту, далее в index.js вызываю функцию(параметр) в контексте необходимого объекта */
        this._handlerSubmit = handlerSubmit.bind("", () => this._getInputValues)

        this._form = this.popup.querySelector('.popup__container')
        this._inputList = this._form.querySelectorAll('.popup__edit')
        this._formValues = {}
    }

    _getInputValues() {

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    _setInputValues(data) {
        this._inputList.forEach(input => {
            input.value = data[input.name];
        });
    }

    setEventListeners() {
        this._form.addEventListener('submit', this._handlerSubmit);

        super.setEventListeners()
    }

    removeEventListeners() {
        this._form.removeEventListener('submit', this._handlerSubmit)

        super.removeEventListeners()
    }

    open(preOpenPopup) {
        if (preOpenPopup()) this._setInputValues(preOpenPopup())
        super.open()
    }

    close() {
        this._form.reset()
        super.close()
    }
}