import Popup from "./Popup";

export default class PopupWithImage extends Popup {

    constructor(selector) {
        super(selector);

        this._popupImage = this.popup.querySelector('.popup__image')
        this._popupTitle = this.popup.querySelector('.popup__title')
    }
    initialisationPopup() {
        super.initialisationPopup();
        this.setEventListeners()
    }
    setEventListeners() {
        super.setEventListeners();
    }

    open(name, link) {
        this._popupImage.src = link;
        this._popupImage.ariaLabel = name;
        this._popupImage.alt = name;
        this._popupTitle.textContent = name;

        super.open()
    }
}