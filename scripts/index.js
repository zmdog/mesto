import * as constants from './constants.js'
import FormValidator from "./FormValidator.mjs";
import Card from './Card.mjs'

/* валидаторы*/
const validatyProfile = new FormValidator(constants.validatyParams, constants.popUpSave);
const validatyPlace = new FormValidator(constants.validatyParams, constants.popUpAdd)


/* Отрисовка всех имеющихся карточек из массива initialCards */
constants.cards.forEach(elem => createCard({name: elem.name, link: elem.link}, ".element-template"))

/* Добавление слушателей */
constants.popUpSave.addEventListener('submit', savePopUpProfile);
constants.popUpAdd.addEventListener('submit', event => savePopUpPlace(event));
constants.profileAddButton.addEventListener('click', () => setPopUpPlaceState());
constants.profileEditButton.addEventListener('click', () => setPopUpProfileState());
constants.popUpModalProfile.addEventListener('click', event => {
    if (isClosePopUpOptions(event)) closePopUp(constants.popUpModalProfile)
})
constants.popUpModalPlace.addEventListener('click', event => {
    if (isClosePopUpOptions(event)) closePopUp(constants.popUpModalPlace)
})
constants.popUpModalImage.addEventListener('click', event => {
    if (isClosePopUpOptions(event)) closePopUp(constants.popUpModalImage)
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
    if (!isClosePopUpOptions(e)) return
    const popUp = document.querySelector('.popup_opened')
    closePopUp(popUp)
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
}

/*Функция скрывает или показывает попАп профиль */
function setPopUpProfileState() {
    constants.popUpName.value = constants.profileName.textContent;
    constants.popUpStatus.value = constants.profileStatus.textContent;
    openPopUp(constants.popUpModalProfile);
    validatyProfile.checkValidation()
}

/*Функция скрывает или показывает попАп места */
function setPopUpPlaceState() {
    openPopUp(constants.popUpModalPlace);
    validatyPlace.checkValidation()
}

/*Функция скрывает или показывает попАп фото */
export function setPopUpImageState(event) {
    constants.popUpImage.src = event.target.src;
    constants.popUpImage.ariaLabel = event.target.ariaLabel;
    constants.popUpImage.alt = event.target.alt;
    constants.popUpTitle.textContent = event.target.closest('.element').querySelector('.element__title').textContent;

    openPopUp(constants.popUpModalImage);
}

/* сохранение изменений профиля */
function savePopUpProfile() {

    constants.profileName.textContent = constants.popUpName.value;
    constants.profileStatus.textContent = constants.popUpStatus.value;
    closePopUp(constants.popUpModalProfile);
}

/* Активация валидаторов */
function activateValidations() {
    validatyProfile.enableValidation()
    validatyPlace.enableValidation()
}

/* сохранение новой карточки  */
function savePopUpPlace(event) {

    createCard({name: constants.popUpPlace.value, link: constants.popUpLink.value}, ".element-template")
    event.target.reset();
    closePopUp(constants.popUpModalPlace);
}

/* Создание карточки */
function createCard(data, elementTemplate) {
    const card = new Card(data, elementTemplate)
    constants.elementGrid.prepend(card.renderCard());
}

/* Условия для закрытия попапа */
function isClosePopUpOptions(e) {
    return e.target.classList.contains('popup__close-button') ||
        (!e.target.classList.contains('popup__wrapper') && e.target.classList.contains('popup_opened')) ||
        e.key === "Escape"
}

activateValidations()