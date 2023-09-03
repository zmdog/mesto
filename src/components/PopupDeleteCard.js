import Popup from "./Popup";

export default class PopupDeleteCard extends Popup {

    constructor({selector, handlerSubmit}) {
        super(selector);

        this._form = this.popup.querySelector('.popup__container')
        this._handlerSubmit = () => handlerSubmit()

    }
    setEventListeners() {
        this._form.addEventListener('submit', this._handlerSubmit);

        super.setEventListeners()
    }
    open(card) {
        this.card = card

        super.open()
    }
}