export default class UserInfo {

    constructor({selectorName, selectorStatus, selectorAvatar}) {

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

    renderingInfoProfile(info) {
        this.name.textContent = info.name
        this.status.textContent = info.about
        this.avatar.src = info.avatar
    }
}