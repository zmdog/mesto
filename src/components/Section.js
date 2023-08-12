export default class Section {
    constructor({items, render}, selector) {

        this._items = items;
        this._render = render;
        this._container = document.querySelector(selector);
    }

    addItem(elem) {
        this._render({name: elem.name, link: elem.link}, ".element-template", this._container)
    }

    renderItems() {

        this._items.forEach(elem => {
            this.addItem(elem)
        })
    }

}


