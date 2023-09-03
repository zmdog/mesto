import './index.css'
import * as constants from '../scripts/constants.js'
import FormValidator from "../components/FormValidator.js";
import Card from '../components/Card.js'
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import PopupDeleteCard from "../components/PopupDeleteCard";
import {api} from "../components/Api"
/* объекты*/
const formValidators = {}
const renderCards = new Section({
    promise: () => {
        api.getInitialCards()
            .then((result) => {
                result.forEach(elem => {
                    const card = createCard(elem, userInformation.userInfo)

                    renderCards.addItemAppend(card)
                })
            })
    },
}, ".elements__elements-grid")
function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)

        const formName = formElement.getAttribute('name')

        formValidators[formName] = validator;
        validator.enableValidation();
    });
}
function createCard(item, info) {

    const cardElement = new Card({item, info}, ".element-template",
        () => popUpModalImage.open(item.name, item.link),
        () => popUpModalDeleteCard.open(cardElement),
        () => {
                if(cardElement.likeStatus()){
                    api.removeLike(cardElement.id)
                        .then((card) =>{
                            cardElement.rerenderCard(card)
                            cardElement.removeLike()
                        })
                        .catch((err) => {
                            console.log(err);
                        })


                }else {
                    api.makeLike(cardElement.id)
                        .then((card) =>{
                            cardElement.rerenderCard(card)
                            cardElement.makeLike()
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }

        }
        )

    return cardElement.renderCard()
}

const userInformation = new UserInfo({
    promise: () => {
        api.getInfoProfile()
            .then(res => {
                userInformation.setUserInfo(res)
            })
            .catch((err) => {
                console.log(err);
            })
    },
    selectorName: ".profile__name",
    selectorStatus: ".profile__status",
    selectorAvatar: '.profile__avatar'})

const popUpModalPlace = new PopupWithForm({
    selector: ".popup_place",
    handlerSubmit: callBack => {
        api.postCard(callBack.call(popUpModalPlace), formValidators.addPlace)
            .then(result => {
                const card = createCard(result, userInformation.userInfo)
                renderCards.addItemPrepend(card)
                popUpModalPlace.close()
                formValidators.addPlace.fetchedButton('Создать')
            })
            .catch((err) => {
                console.log(err);
            })
    }
})
const popUpModalProfile = new PopupWithForm({
    selector: ".popup_profile",
    handlerSubmit: callBack => {
        api.setInfoProfile(callBack.call(popUpModalProfile), formValidators.changeProfile)
            .then(() => {
                userInformation.renderingInfoProfile()
                popUpModalProfile.close()
                formValidators.changeProfile.fetchedButton('Сохранить')
            })
            .catch((err) => {
                console.log(err);
            })
    }
})
const popUpModalImage = new PopupWithImage(".popup_image")
const popUpModalAvatar = new PopupWithForm({
    selector: ".popup_avatar",
    handlerSubmit: callBack => {
        api.setInfoAvatar(callBack.call(popUpModalAvatar), formValidators.changeAvatar)
            .then(() => {
                userInformation.renderingInfoProfile()
                popUpModalAvatar.close()
                formValidators.changeAvatar.fetchedButton('Сохранить')
            })
            .catch((err) => {
                console.log(err);
            })
    }
})
const popUpModalDeleteCard = new PopupDeleteCard({
    selector: ".popup_delete",
    handlerSubmit: () => {
        api.deleteCard(popUpModalDeleteCard.card.id)
            .then(() => {
                popUpModalDeleteCard.card.deleteCard()
                popUpModalDeleteCard.close()
            })
            .catch((err) => {
                console.log(err);
            })
    }
})

constants.profileAddButton.addEventListener('click', () => {
    popUpModalPlace.open()
    formValidators.addPlace.toggleButtonState()
})
constants.profileEditButton.addEventListener('click', () => popUpModalProfile.open(() => userInformation.getUserInfo()));
constants.profileChangeButton.addEventListener('click', () => {
    popUpModalAvatar.open()
    formValidators.changeAvatar.toggleButtonState()
})

enableValidation(constants.validatyParams);
renderCards.renderItems()
userInformation.renderingInfoProfile()