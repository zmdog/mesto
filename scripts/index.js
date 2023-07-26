import {initialCards} from './initial-cards.js'
import FormValidator from "./FormValidator.mjs";
import Card from './Card.mjs'

/* попапы*/
const popUpModalProfile = document.querySelector(".popup_profile");
const popUpModalPlace = document.querySelector(".popup_place");
const popUpModalImage = document.querySelector(".popup_image");
/* инпуты попапа профиля */
const popUpName = popUpModalProfile.querySelector(".popup__edit[name='name']");
const popUpStatus = popUpModalProfile.querySelector(".popup__edit[name='status']");
/* инпуты попапа место */
const popUpPlace = popUpModalPlace.querySelector(".popup__edit[name='place']");
const popUpLink = popUpModalPlace.querySelector(".popup__edit[name='link']");
/* контейнеры попапа фото */
const popUpImage = popUpModalImage.querySelector('.popup__image');
const popUpTitle = popUpModalImage.querySelector('.popup__title');
/* формы попапов*/
const popUpSave = popUpModalProfile.querySelector('.popup__container');
const popUpAdd = popUpModalPlace.querySelector('.popup__container');
/* кнопки форм*/
const popUpSaveButton = popUpSave.querySelector('.popup__submit-button');
const popUpAddButton = popUpAdd.querySelector('.popup__submit-button');
/* шаблон для карточек*/
const elementTemplate = document.querySelector(".element-template");
/* контейнер для карточек*/
const elementGrid = document.querySelector(".elements__elements-grid");
/* Элементы шапки профиля */
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
/* Общие параметры для валидации */
const validatyParams = {
    inputSelector: '.popup__edit',
    submitButtonSelector: 'popup__submit-button',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__error_visible'
}
/* Общее перезаписываемое хранилище объектов*/
let validaty;


/* Отрисовка всех имеющихся карточек из массива initialCards */
initialCards.forEach(elem => {
    const card = new Card({name: elem.name, link: elem.link}, elementTemplate)
    elementGrid.prepend(card.renderCard());
    })

/* Добавление слушателей */
popUpSave.addEventListener('submit', savePopUpProfile);
popUpAdd.addEventListener('submit', event => savePopUpPlace(event));
profileAddButton.addEventListener('click', () => checkPopUpPlaceState(true));
profileEditButton.addEventListener('click', () => checkPopUpProfileState(true));
popUpModalProfile.addEventListener('click', event => {
    if (closePopUpOptions(event)) checkPopUpProfileState(false)
})
popUpModalPlace.addEventListener('click', event => {
    if (closePopUpOptions(event)) checkPopUpPlaceState(false)
})
popUpModalImage.addEventListener('click', event => {
    if (closePopUpOptions(event)) checkPopUpImageState(false)
})
/* Создание события пон нажатию на esc */
function addEventListenerEsc() {
    document.addEventListener('keydown', closeEscPopUp)
}
/* Удаление события пон нажатию на esc */
function removeEventListenerEsc() {
    document.removeEventListener('keydown', closeEscPopUp)
}
/* Закрытие попапа при нажатии на esc */
function closeEscPopUp(e) {
    const popUp = document.querySelector('.popup_opened')
    if (closePopUpOptions(e)) closePopUp(popUp)
}
/* Открытие попапа */
export function openPopUp(popup) {
    addEventListenerEsc()
    popup.classList.add('popup_opened');
    popup.classList.remove('popup_closed');
}
/* Закрытие попапа */
export function closePopUp(popup) {
    removeEventListenerEsc()
    popup.classList.add('popup_closed');
    popup.classList.remove('popup_opened');
    setTimeout(function () {
        popup.classList.remove('popup_opened');
    }, 190);
}

/*Функция скрывает или показывает попАп профиль */
function checkPopUpProfileState(state) {
    if (state) {
        validaty = new FormValidator(validatyParams, popUpSave)
        validaty.enableValidation()
        popUpName.value = profileName.textContent;
        popUpStatus.value = profileStatus.textContent;
        openPopUp(popUpModalProfile);
    } else {
        closePopUp(popUpModalProfile);
    }
}

/*Функция скрывает или показывает попАп места */
function checkPopUpPlaceState(state) {
    if (state) {
        validaty = new FormValidator(validatyParams, popUpAdd)
        validaty.enableValidation()
        openPopUp(popUpModalPlace);
    } else {
        closePopUp(popUpModalPlace);
    }
}

/*Функция скрывает или показывает попАп фото */
export function checkPopUpImageState(state, event) {
    if (state) {

        popUpImage.src = event.target.src;
        popUpImage.ariaLabel = event.target.ariaLabel;
        popUpImage.alt = event.target.alt;
        popUpTitle.textContent = event.target.closest('.element').querySelector('.element__title').textContent;

        openPopUp(popUpModalImage);
    } else {
        closePopUp(popUpModalImage);
    }
}

/* сохранение изменений профиля */
function savePopUpProfile() {

    if (popUpSaveButton.classList.contains('popup__submit-button_active')) {
        profileName.textContent = popUpName.value;
        profileStatus.textContent = popUpStatus.value;
        checkPopUpProfileState(false);
    }
}

/* сохранение новой карточки  */
function savePopUpPlace(event) {

    if(popUpAddButton.classList.contains('popup__submit-button_active')){
        const card = new Card({name: popUpPlace.value, link: popUpLink.value}, elementTemplate)
        elementGrid.prepend(card.renderCard());
        event.target.reset();
        validaty.toggleButtonInactivity(popUpAddButton, 'popup__submit-button')
        checkPopUpPlaceState(false);
    }
}
/* Условия для закрытия попапа */
function closePopUpOptions(e) {
    return e.target.classList.contains('popup__close-button') ||
        (!e.target.classList.contains('popup__wrapper') && e.target.classList.contains('popup_opened')) ||
        e.keyCode === 27
}