export default class Card {
    constructor(data, elementTemplate, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = elementTemplate;
        this._handleCardClick = handleCardClick
    }

    _getTemplate() {
        return document.querySelector(this._templateSelector)
            .content
            .querySelector('.wrapper-element')
            .cloneNode(true);
    }

    _createCard() {
        const altText = 'Фото ' + this._name;

        this._element = this._getTemplate();
        this._photo = this._element.querySelector('.element__photo');
        this._elementTitle = this._element.querySelector('.element__title');
        this._elementBtn = this._element.querySelector('.element__like');
        this._elementDelete = this._element.querySelector('.element__delete');
        this._setEvents();

        this._photo.src = this._link;
        this._photo.alt = altText;
        this._photo.ariaLabel = altText;
        this._elementTitle.textContent = this._name;
        this._elementBtn.ariaLabel = 'Поставить лайк фото ' + this._name;
    }

    renderCard() {
        this._createCard()
        return this._element
    }

    _toggleLikeStatus() {
        this._elementBtn.classList.toggle('element__like_active');
    }

    _deleteCard() {
        this._element.remove();
    }

    _setEvents() {
        this._elementDelete.addEventListener('click', () => this._deleteCard());
        this._elementBtn.addEventListener('click', () => this._toggleLikeStatus());
        this._photo.addEventListener('click', event => this._handleCardClick(event));
    }
}