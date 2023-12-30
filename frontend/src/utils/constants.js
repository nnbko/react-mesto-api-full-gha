export const profilePopup = document.querySelector('.popup_profile');
export const popupAddPhoto = document.querySelector('.popup_add')
export const popupAvatar = document.querySelector('.popup_avatar');
export const popupAdd = document.querySelector('.popup_add');

export const openButtonAvatar = document.querySelector('.profile__avatar-edit-button');
export const openButtonProfile = document.querySelector('.profile__edit-button');
export const openButtonAdd = document.querySelector('.profile__add-button');

export const formPopupEditProfile = profilePopup.querySelector('.popup__form_profile');
export const formPopupAvatarEdit = popupAvatar.querySelector('.popup__form_avatar-edit');

export const nameText = formPopupEditProfile.querySelector('.popup__holder_name_text');
export const jobText = formPopupEditProfile.querySelector('.popup__holder_job_text');



export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__holder',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'form__input-error_visible'
};

