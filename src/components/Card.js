export default class Card {
    constructor({item, info}, elementTemplate, handleClickCard, handleDeleteCard, handleLikeCard) {
        this._id = item._id
        this._name = item.name;
        this._link = item.link;
        this._likes = item.likes
        this.cardId = info._id
        this.ownerId = item.owner._id
        this._templateSelector = elementTemplate;
        this._handleClickCard = handleClickCard
        this._handleDeleteCard = handleDeleteCard
        this._handleLikeCard = handleLikeCard
    }

    _likeStatus() {
        return this._likes.find((person) => {
            return person._id === this.cardId
        })
    }
    _deleteButton() {
        if(!(this.ownerId === this.cardId)) this._elementDelete.classList.add('element__delete_removed')
    }
    _getTemplate() {
        return document.querySelector(this._templateSelector)
            .content
            .querySelector('.wrapper-element')
            .cloneNode(true);
    }
    getId() {
        return this._id
    }
    getLikeStatus() {
        return this._likeStatus()
    }
    deleteCard() {
        this._element.remove();
    }

    _createCard(card) {
        const altText = 'Фото ' + this._name;
        this._element = this._getTemplate();
        this._photo = this._element.querySelector('.element__photo');
        this._elementTitle = this._element.querySelector('.element__title');
        this._elementBtn = this._element.querySelector('.element__like');
        this._elementDelete = this._element.querySelector('.element__delete');
        this._elementLikes = this._element.querySelector('.element__counter_like');
        this._setEvents();

        this._photo.src = this._link;
        this._photo.alt = altText;
        this._photo.ariaLabel = altText;
        this._elementTitle.textContent = this._name;
        this._elementBtn.ariaLabel = 'Поставить лайк фото ' + this._name;
        this._elementLikes.textContent = this._likes.length
        this._deleteButton()
        if(this._likeStatus()){
            this.makeLike(card)

        }else this.removeLike(card)
    }

    renderCard(card) {
        this._createCard(card)
        return this._element
    }
    countLikes(card) {
        this._elementLikes.textContent = card.likes.length
        this._likes = card.likes
    }
    makeLike(card) {
        this.countLikes(card)
        this._elementBtn.classList.add('element__like_active');
    }
    removeLike(card) {
        this.countLikes(card)
        this._elementBtn.classList.remove('element__like_active');
    }
    _setEvents() {
        this._elementDelete.addEventListener('click', () => this._handleDeleteCard());
        this._elementBtn.addEventListener('click', () => this._handleLikeCard());
        this._photo.addEventListener('click', event => this._handleClickCard(event));
    }
}