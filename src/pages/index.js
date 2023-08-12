import * as constants from '../scripts/constants.js'
import FormValidator from "../components/FormValidator.mjs";
import Card from '../components/Card.mjs'
import './index.css'
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

/* объекты*/
const validatyProfile = new FormValidator(constants.validatyParams, constants.popUpSave);
const validatyPlace = new FormValidator(constants.validatyParams, constants.popUpAdd);

const UserInformation = new UserInfo({selectorName: ".profile__name", selectorStatus: ".profile__status"})

const popUpModalProfile = new PopupWithForm(".popup_profile", () => {
    UserInformation.setUserInfo({
        name: popUpModalProfile._popUpName.value,
        status: popUpModalProfile._popUpStatus.value
    })
    validatyProfile.checkValidation()
    popUpModalProfile.close()
}, () => UserInformation.getUserInfo())

const popUpModalPlace = new PopupWithForm(".popup_place", () => {

    renderCards.addItem({name: constants.popUpPlace.value, link: constants.popUpLink.value}, ".element-template")
    popUpModalPlace.close()
})

const popUpModalImage = new PopupWithImage(".popup_image")
/* Отрисовка всех имеющихся карточек из массива initialCards */
const renderCards = new Section({
    items: constants.cards,
    render: (data, elementTemplate, container) => {
        const card = new Card(data, elementTemplate, event => popUpModalImage.open(event))
        container.prepend(card.renderCard());
    }
}, ".elements__elements-grid")
constants.profileAddButton.addEventListener('click', () => popUpModalPlace.open());
constants.profileEditButton.addEventListener('click', () => popUpModalProfile.open());


validatyProfile.enableValidation()
validatyPlace.enableValidation()
renderCards.renderItems()