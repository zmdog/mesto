export const cards = [
    {
        name: 'Горы Архыза',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]
/* Общие параметры для валидации */
export const validatyParams = {
    inputSelector: '.popup__edit',
    submitButtonSelector: 'popup__submit-button',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__error_visible',
    submitActiveButtonSelector: 'popup__submit-button_active',
    submitInactiveButtonSelector: 'popup__submit-button_inactive'
}
/* попапы*/
export const popUpModalPlace = document.querySelector(".popup_place");
/* инпуты попапа место */
export const popUpPlace = popUpModalPlace.querySelector(".popup__edit[name='place']");
export const popUpLink = popUpModalPlace.querySelector(".popup__edit[name='link']");
/* формы попапов*/
export const popUpSave = document.querySelector('.popup__container_profile');
export const popUpAdd = document.querySelector('.popup__container_place');
export const profileAddButton = document.querySelector('.profile__add-button');
export const profileEditButton = document.querySelector('.profile__edit-button');