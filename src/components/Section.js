export default class Section {
    constructor(selector) {

        this._container = document.querySelector(selector);
    }

    addItemAppend(card) {
        this._container.append(card)
    }
    addItemPrepend(card) {
        this._container.prepend(card)
    }

    renderItems(cards) {
        cards.forEach((card) => {
            this.addItemAppend(card)
        })
    }

}


