export default class Popup {

    constructor(selector) {
        this.popup = document.querySelector(selector)
        this._handleEscClose = (event) => {
            if (event.key !== "Escape") return
            this.close()
        }
        this._handleClickClose = (event) => {
            if (
                event.target.classList.contains('popup__close-button') ||
                !event.target.closest('.popup__wrapper')
            ) this.close()
        }
    }

    open() {
        this.setEventListeners()
        this.popup.classList.add('popup_opened');
        this.popup.classList.remove('popup_closed');
    }

    close() {
        this.removeEventListeners()
        this.popup.classList.add('popup_closed');
        this.popup.classList.remove('popup_opened');
    }

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose)
        this.popup.addEventListener('click', this._handleClickClose)
    }

    removeEventListeners() {
        document.removeEventListener('keydown', this._handleEscClose)
        this.popup.removeEventListener('click', this._handleClickClose)
    }
}