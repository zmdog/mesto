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


const formValidators = {}
const renderCards = new Section( ".elements__elements-grid")
function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)

        const formName = formElement.getAttribute('name')

        formValidators[formName] = validator;
        validator.enableValidation();
    });
}
    Promise.all([
        api.getInfoProfile(),
        api.getInitialCards()
    ])
        .then(([info, cards])=>{
            const userInformation = new UserInfo({
                selectorName: ".profile__name",
                selectorStatus: ".profile__status",
                selectorAvatar: '.profile__avatar'})

            const popUpModalPlace = new PopupWithForm({
                selector: ".popup_place",
                handlerSubmit: infoProfile => {
                    formValidators.addPlace.fetchButton()
                    api.postCard(infoProfile)
                        .then(result => {
                            const card = createCard(result, info)
                            renderCards.addItemPrepend(card)
                            popUpModalPlace.close()
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                        .finally(() => formValidators.addPlace.fetchedButton('Создать'))
                }
            })
            const popUpModalProfile = new PopupWithForm({
                selector: ".popup_profile",
                handlerSubmit: info => {
                    formValidators.changeProfile.fetchButton()
                    api.setInfoProfile(info)
                        .then((res) => {
                            userInformation.renderingInfoProfile(res)
                            popUpModalProfile.close()
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                        .finally(() => formValidators.changeProfile.fetchedButton('Сохранить'))
                }
            })
            const popUpModalImage = new PopupWithImage(".popup_image")
            const popUpModalAvatar = new PopupWithForm({
                selector: ".popup_avatar",
                handlerSubmit: info => {
                    formValidators.changeAvatar.fetchButton()
                    api.setInfoAvatar(info)
                        .then((res) => {
                            userInformation.renderingInfoProfile(res)
                            popUpModalAvatar.close()
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                        .finally(() => formValidators.changeAvatar.fetchedButton('Сохранить'))
                }
            })
            const popUpModalDeleteCard = new PopupDeleteCard({
                selector: ".popup_delete",
                handlerSubmit: () => {
                    api.deleteCard(popUpModalDeleteCard.card.getId())
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
            constants.profileEditButton.addEventListener('click', () => {
                popUpModalProfile.setInputValues(userInformation.getUserInfo())
                popUpModalProfile.open()
            });
            constants.profileChangeButton.addEventListener('click', () => {
                popUpModalAvatar.open()
                formValidators.changeAvatar.toggleButtonState()
            })
            function createCard(item, info) {

                const cardElement = new Card({item, info}, ".element-template",
                    () => popUpModalImage.open(item.name, item.link),
                    () => popUpModalDeleteCard.open(cardElement),
                    () => {
                        if(cardElement.getLikeStatus()){
                            api.removeLike(cardElement.getId())
                                .then((card) =>{
                                    cardElement.removeLike(card)
                                })
                                .catch((err) => {
                                    console.log(err);
                                })


                        }else {
                            api.makeLike(cardElement.getId())
                                .then((card) =>{
                                    cardElement.makeLike(card)
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                        }

                    }
                )

                return cardElement.renderCard(item)
            }

            popUpModalPlace.initialisationPopup()
            popUpModalProfile.initialisationPopup()
            popUpModalAvatar.initialisationPopup()
            popUpModalDeleteCard.initialisationPopup()
            popUpModalImage.initialisationPopup()
            userInformation.renderingInfoProfile(info)
            return cards.map(elem => {
                return createCard(elem, info)
            })
        })
        .then(cards => renderCards.renderItems(cards))
        .catch((err)=>{
            console.log(err);
        })

enableValidation(constants.validatyParams);