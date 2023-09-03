export default class Card {
    constructor({item, info}, elementTemplate, handleClickCard, handleDeleteCard, handleLikeCard) {
        this.id = item._id
        this.name = item.name;
        this._link = item.link;
        this.likes = item.likes
        this._templateSelector = elementTemplate;
        this._handleClickCard = handleClickCard
        this._handleDeleteCard = handleDeleteCard
        this._handleLikeCard = handleLikeCard
        this._deleteButton = () => {
            if(!(item.owner.name === info.name)) this._elementDelete.classList.add('element__delete_removed')
        }
        this.likeStatus = () => {

            return this.likes.find((person) => {
                return person.name === info.name
            })
        }
    }

    _getTemplate() {
        return document.querySelector(this._templateSelector)
            .content
            .querySelector('.wrapper-element')
            .cloneNode(true);
    }
    deleteCard() {
        this._element.remove();
    }

    _createCard() {
        const altText = 'Фото ' + this.name;
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
        this._elementTitle.textContent = this.name;
        this._elementBtn.ariaLabel = 'Поставить лайк фото ' + this.name;
        this._elementLikes.textContent = this.likes.length
        this._deleteButton()
        if(this.likeStatus()){
            this.makeLike()

        }else this.removeLike()
    }

    renderCard() {
        this._createCard()
        return this._element
    }

    makeLike() {
        this._elementBtn.classList.add('element__like_active');
    }

    removeLike() {
        this._elementBtn.classList.remove('element__like_active');
    }

    rerenderCard(card) {
        this.name = card.name;
        this._link = card.link;
        this.likes = card.likes
        this._elementLikes.textContent = this.likes.length
    }
    _setEvents() {
        this._elementDelete.addEventListener('click', () => this._handleDeleteCard());
        this._elementBtn.addEventListener('click', () => this._handleLikeCard());
        this._photo.addEventListener('click', event => this._handleClickCard(event));
    }
}