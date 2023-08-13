export default class Section {
    constructor({items, render}, selector) {

        this._items = items;
        this._render = render;
        this._container = document.querySelector(selector);
    }

    addItem(card) {
        this._container.prepend(card)
    }

    renderItems() {

        this._items.forEach(elem => {
            this._render(elem)
        })
    }

}


