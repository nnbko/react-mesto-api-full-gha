class Api {
    constructor(apiOptions) {
        this._baseUrl = apiOptions.url;
    }

    _getData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(this._getData)
    }
    pushUserInfo(data) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._getData)
    }
    pushAvatar(newLinkAvatar) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                avatar: newLinkAvatar.avatar,
            })
        })
            .then(this._getData)
    }
    getInitialCards() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(this._getData)
    }
    deleteCard(cardId) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(this._getData)
    }
    changeLikeCardStatus(cardId, isLiked) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: `${!isLiked ? "DELETE" : "PUT"}`,
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(this._getData)
    }
    pushInfoCreateCard(data) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(this._getData)
    }
    getAllInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }
}
export const apiOptions = {
    url: "http://127.0.0.1:3001",
    headers: {
        'Content-Type': 'application/json'
    }
}
export const api = new Api(apiOptions);