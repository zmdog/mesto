class Api {
    constructor(options) {
        this._options = options
        this._cardsUrl = options.cardsUrl
        this._profileInfo = options.profileInfo
        this._profileAvatar = options.profileAvatar

    }

    getInitialCards() {
        return fetch(this._cardsUrl, {
            headers: this._options.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    getInfoProfile() {
        return fetch(this._profileInfo, {
            headers: this._options.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    setInfoProfile(data, form) {

        form.fetchButton()
        return fetch(this._profileInfo, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.status
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    setInfoAvatar(data, form) {

        form.fetchButton()
        return fetch(this._profileAvatar, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                avatar: data.link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    postCard(data, form) {

        form.fetchButton()
        return fetch(this._cardsUrl, {
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    deleteCard(id) {
        return fetch(`${this._cardsUrl}/${id}`, {
            method: 'DELETE',
            headers: this._options.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    makeLike(id) {
        return fetch(`${this._cardsUrl}/${id}/likes`, {
            method: 'PUT',
            headers: this._options.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    removeLike(id) {
        return fetch(`${this._cardsUrl}/${id}/likes`, {
            method: 'DELETE',
            headers: this._options.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

}

export const api = new Api({
    cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-73/cards',
    profileInfo: 'https://mesto.nomoreparties.co/v1/cohort-73/users/me',
    profileAvatar: 'https://mesto.nomoreparties.co/v1/cohort-73/users/me/avatar',
    headers: {
        authorization: '94ec7d81-a68f-476c-85b4-29b28770f78f',
        'Content-Type': 'application/json'
    }
});