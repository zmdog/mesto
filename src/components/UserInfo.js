export default class UserInfo {

    constructor({promise, selectorName, selectorStatus, selectorAvatar}) {

        this.promise = promise
        this.name = document.querySelector(selectorName);
        this.status = document.querySelector(selectorStatus);
        this.avatar = document.querySelector(selectorAvatar);
    }

    getUserInfo() {
        return {
            name: this.name.textContent,
            status: this.status.textContent
        }
    }
    setUserInfo(userInfo) {

        this.userInfo = userInfo
        this.name.textContent = userInfo.name
        this.status.textContent = userInfo.about
        this.avatar.src = userInfo.avatar
    }

    renderingInfoProfile() {
        this.promise()
    }
}