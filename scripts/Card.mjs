import {checkPopUpImageState} from "./index.js";

export default class Card {
    constructor(data, elementTemplate){
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = elementTemplate;
    }

    _getTemplate() {
        return this._templateSelector
            .content
            .querySelector('.wrapper-element')
            .cloneNode(true);
    }
    _createCard() {
        this._element = this._getTemplate();
        this._photo = this._element.querySelector('.element__photo');
        this._elementTitle = this._element.querySelector('.element__title');
        this._elementBtn = this._element.querySelector('.element__like');
        this._elementDelete = this._element.querySelector('.element__delete');
        this._setEvents();

        this._photo.src = this._link;
        this._photo.alt = 'Фото ' + this._name;
        this._photo.ariaLabel = 'Фото ' + this._name;
        this._elementTitle.textContent = this._name;
        this._elementBtn.ariaLabel = 'Поставить лайк фото ' + this._name;
    }

    renderCard() {
        this._createCard()
        return this._element
    }
    _toggleLikeStatus(event) {
        if (event.target.classList.contains('element__like')) event.target.classList.toggle('element__like_active');
    }
    _deleteCard(event) {
        event.target.closest('.wrapper-element').remove();
    }
    _setEvents() {
        this._elementDelete.addEventListener('click', event => this._deleteCard(event));
        this._elementBtn.addEventListener('click', event => this._toggleLikeStatus(event));
        this._photo.addEventListener('click', event => checkPopUpImageState(true, event));
    }
}