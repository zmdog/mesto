import Popup from "./Popup";

export default class PopupWithImage extends Popup {

    constructor(selector) {
        super(selector);

        this._popupImage = this.popup.querySelector('.popup__image')
        this._popupTitle = this.popup.querySelector('.popup__title')
    }

    open(event) {
        this._popupImage.src = event.target.src;
        this._popupImage.ariaLabel = event.target.ariaLabel;
        this._popupImage.alt = event.target.alt;
        this._popupTitle.textContent = event.target.closest('.element').querySelector('.element__title').textContent;

        super.open()
    }
}