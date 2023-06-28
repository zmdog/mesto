import {initialCards} from './initial-cards.js'

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
/* кнопки закрытия*/
const popUpProfileCloseButton = popUpModalProfile.querySelector('.popup__close-button_profile');
const popUpPlaceCloseButton = popUpModalPlace.querySelector('.popup__close-button_place');
const popUpImageCloseButton = popUpModalImage.querySelector('.popup__close-button_image');
/* кнопки подтверждения*/
const popUpSave = popUpModalProfile.querySelector('.popup__container');
const popUpAdd = popUpModalPlace.querySelector('.popup__container');
/* шаблон для карточек*/
const elementTemplate = document.querySelector(".element-template");
/* контейнер для карточек*/
const elementGrid = document.querySelector(".elements__elements-grid");
/* Элементы шапки профиля */
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');

/* Отрисовка всех имеющихся карточек из массива initialCards */
initialCards.forEach(elem => {
    elementGrid.prepend(createCard(elem.name, elem.link));
})

elementGrid.addEventListener('click', event => toggleLikeStatus(event));
profileAddButton.addEventListener('click', () => checkPopUpPlaceState(true));
profileEditButton.addEventListener('click', () => checkPopUpProfileState(true));
popUpProfileCloseButton.addEventListener('click', () => checkPopUpProfileState(false));
popUpPlaceCloseButton.addEventListener('click', () => checkPopUpPlaceState(false));
popUpImageCloseButton.addEventListener('click', () => checkPopUpImageState(false));
popUpSave.addEventListener('submit', event => savePopUpProfile(event));
popUpAdd.addEventListener('submit', event => savePopUpPlace(event));

/* Переключатель для лайков */
function toggleLikeStatus(event) {
    if (event.target.classList.contains('element__like')) event.target.classList.toggle('element__like_active');
}
/* Удаление карточек */
function deleteCard(event) {
    event.target.closest('.wrapper-element').remove();
}
function openPopUp(popup) {
    popup.classList.add('popup_opened');
    popup.classList.remove('popup_closed');
}
function closePopUp(popup) {
    popup.classList.add('popup_closed');
    setTimeout(function () {
        popup.classList.remove('popup_opened');
    }, 190);
}
/*Функция скрывает или показывает попАп профиль */
function checkPopUpProfileState(state) {
    if (state) {

        popUpName.value = profileName.textContent;
        popUpStatus.value = profileStatus.textContent;
        openPopUp(popUpModalProfile)
    } else {
        closePopUp(popUpModalProfile)
    }
}
/*Функция скрывает или показывает попАп места */
function checkPopUpPlaceState(state) {
    if (state) {
        openPopUp(popUpModalPlace)
    } else {
        closePopUp(popUpModalPlace)
    }
}
/*Функция скрывает или показывает попАп фото */
function checkPopUpImageState(state, event) {
    if (state) {

        popUpImage.src = event.target.src;
        popUpImage.ariaLabel = event.target.ariaLabel;
        popUpImage.alt = event.target.alt;
        popUpTitle.textContent = event.target.closest('.element').querySelector('.element__title').textContent;

        openPopUp(popUpModalImage)
    } else {
        closePopUp(popUpModalImage)
    }
}
/* сохранение изменений профиля */
function savePopUpProfile(event) {
    event.preventDefault();

    profileName.textContent = popUpName.value;
    profileStatus.textContent = popUpStatus.value;
    checkPopUpProfileState(false)
}
/* сохранение новой карточки  */
function savePopUpPlace(event) {
    event.preventDefault();

    elementGrid.prepend(createCard(popUpPlace.value, popUpLink.value));
    event.target.reset()
    checkPopUpPlaceState(false);

}
/* Создание и возврат карточки */
function createCard(name, link) {

    const element = elementTemplate.content.cloneNode(true);
    const photo = element.querySelector('.element__photo');
    const elementTitle = element.querySelector('.element__title');
    const elementBtn = element.querySelector('.element__like');
    const elementDelete = element.querySelector('.element__delete');

    photo.src = link;
    photo.alt = 'Фото ' + name;
    photo.ariaLabel = 'Фото ' + name;
    elementTitle.textContent = name;
    elementBtn.ariaLabel = 'Поставить лайк фото ' + name;
    elementDelete.addEventListener('click', event => deleteCard(event));
    photo.addEventListener('click', event => checkPopUpImageState(true, event));

    return element
}

