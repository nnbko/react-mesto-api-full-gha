class Api {
    constructor(apiOptions) {
        this._baseUrl = apiOptions.url;
        this._headers = apiOptions.headers;
    }

    _getData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => this._getData(res))
    }

    pushUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => this._getData(res))
    }
    pushAvatar(newLinkAvatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: newLinkAvatar.avatar,
            })
        })
            .then(res => this._getData(res))
    }
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(res => this._getData(res))
    }
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._getData(res))
    }
    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers,
        })
            .then(res => this._getData(res))
    }
    pushInfoCreateCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(res => this._getData(res))
    }
    getAllInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }
};

export const apiOptions = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-76',
    headers: {
        authorization: '7cbb9037-1aa3-4e4a-b012-940234b48bc1',
        'Content-Type': 'application/json'
    }
}
export const api = new Api(apiOptions);