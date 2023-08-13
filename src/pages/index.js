import * as constants from '../scripts/constants.js'
import FormValidator from "../components/FormValidator.js";
import Card from '../components/Card.js'
import './index.css'
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

/* объекты*/
const formValidators = {}

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)

        const formName = formElement.getAttribute('name')

        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

const userInformation = new UserInfo({selectorName: ".profile__name", selectorStatus: ".profile__status"})

const popUpModalProfile = new PopupWithForm({
    selector: ".popup_profile",
    handlerSubmit: (callBack) => {
        formValidators.changeProfile.checkValidation()
        callBack().call(popUpModalProfile)
        userInformation.setUserInfo(popUpModalProfile._formValues)
        popUpModalProfile.close()
    }
})
const popUpModalImage = new PopupWithImage(".popup_image")
/* Отрисовка всех имеющихся карточек из массива initialCards */
const renderCards = new Section({
    items: constants.cards,
    render: (data) => {
        const card = new Card(data, ".element-template", event => popUpModalImage.open(
            event.target.closest('.element').querySelector('.element__title').textContent,
            event.target.src))
        renderCards.addItem(card.renderCard())
    }
}, ".elements__elements-grid")

const popUpModalPlace = new PopupWithForm({
    selector: ".popup_place",
    handlerSubmit:(callBack) => {
        const card = new Card(callBack().call(popUpModalPlace), ".element-template", event => popUpModalImage.open(
            event.target.closest('.element').querySelector('.element__title').textContent,
            event.target.src))
        console.log(callBack().call(popUpModalPlace))
        renderCards.addItem(card.renderCard())
        formValidators.addPlace.toggleButtonState()
        popUpModalPlace.close()
    }}

)
constants.profileAddButton.addEventListener('click', () => popUpModalPlace.open(() => formValidators.addPlace.toggleButtonState()));
constants.profileEditButton.addEventListener('click', () => popUpModalProfile.open(() => userInformation.getUserInfo()));


enableValidation(constants.validatyParams);
renderCards.renderItems()