export default class UserInfo {

    constructor({selectorName, selectorStatus}) {

        this._selectorName = selectorName;
        this._selectorStatus = selectorStatus;
    }

    getUserInfo() {
        return {
            name: document.querySelector(this._selectorName),
            status: document.querySelector(this._selectorStatus)
        }
    }

    setUserInfo(data) {
        this.getUserInfo().name.textContent = data.name
        this.getUserInfo().status.textContent = data.status
    }
}