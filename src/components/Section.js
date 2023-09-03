export default class Section {
    constructor(selector, render) {
        this._render = render
        this._container = document.querySelector(selector);
    }

    addItemAppend(card) {
        this._container.append(card)
    }

    render(card, info) {
        return this._render(card, info)
    }
    addItemPrepend(card) {
        this._container.prepend(card)
    }

    renderItems(cards, info) {

        cards.forEach((card) => {
            this.addItemAppend(this.render(card, info))
        })
    }

}


