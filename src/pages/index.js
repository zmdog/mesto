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

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)

        const formName = formElement.getAttribute('name')

        formValidators[formName] = validator;
        validator.enableValidation();
    });
}

function createCard(item) {
    const cardElement = new Card(item, ".element-template", () => popUpModalImage.open(item.name, item.link))

    return cardElement.renderCard()
}

const userInformation = new UserInfo({selectorName: ".profile__name", selectorStatus: ".profile__status"})

const popUpModalProfile = new PopupWithForm({
    selector: ".popup_profile",
    handlerSubmit: (callBack) => {
        callBack.call(popUpModalProfile)
        userInformation.setUserInfo(popUpModalProfile.formValues)
        popUpModalProfile.close()
    }
})

const popUpModalImage = new PopupWithImage(".popup_image")
/* Отрисовка всех имеющихся карточек из массива initialCards */
const renderCards = new Section({
    items: constants.cards,
    render: (data) => {
        const card = createCard(data)

        renderCards.addItem(card)
    }
}, ".elements__elements-grid")

const popUpModalPlace = new PopupWithForm({
        selector: ".popup_place",
        handlerSubmit: (callBack) => {
            const card = createCard(callBack.call(popUpModalPlace))

            renderCards.addItem(card)
            popUpModalPlace.close()
        }
    }
)
constants.profileAddButton.addEventListener('click', () => {
    popUpModalPlace.open()
    formValidators.addPlace.toggleButtonState()
})
constants.profileEditButton.addEventListener('click', () => popUpModalProfile.open(() => userInformation.getUserInfo()));


enableValidation(constants.validatyParams);
renderCards.renderItems()