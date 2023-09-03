export default class Section {
    constructor({promise}, selector) {

        this._promise = promise;
        this._container = document.querySelector(selector);
    }

    addItemAppend(card) {
        this._container.append(card)
    }
    addItemPrepend(card) {
        this._container.prepend(card)
    }

    renderItems() {
        this._promise()
    }

}


