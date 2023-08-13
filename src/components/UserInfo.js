export default class UserInfo {

    constructor({selectorName, selectorStatus}) {

        this._name = document.querySelector(selectorName);
        this._status = document.querySelector(selectorStatus);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            status: this._status.textContent
        }
    }

    setUserInfo(data) {
        this._name.textContent = data.name
        this._status.textContent = data.status
    }
}