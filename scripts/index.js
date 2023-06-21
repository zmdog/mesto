const
    initialCards = [
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
    ],
    popUpModal = document.querySelector(".popup"),
    /* шаблон для карточек*/
    elementTemplate = document.querySelector(".element-template"),
    formTemplate = document.querySelector('.form-template'),
    imageTemplate = document.querySelector('.image-template'),
    /* контейнер для карточек*/
    elementGrid = document.querySelector(".elements__elements-grid"),
    /* Элементы шапки профиля */
    profileName = document.querySelector(".profile__name"),
    profileStatus = document.querySelector(".profile__status"),
    profileAddButton = document.querySelector('.profile__add-button'),
    profileEditButton = document.querySelector('.profile__edit-button');
let popUpCloseButton;
/* Инструкция для присвоения типа и слушателя к элементам дерева*/
const buttons = [
    {element: elementGrid, event: 'click', func: toggleLikeStatus},
    {element: profileEditButton, event: 'click', func: openPopUp},
    {element: profileAddButton, event: 'click', func: openPopUp},
];

/* Отрисовка всех имеющихся карточек из массива initialCards */
initialCards.forEach(elem => {
    const
        element = elementTemplate.content.cloneNode(true),
        photo = element.querySelector('.element__photo'),
        elementTitle = element.querySelector('.element__title'),
        likeBtn = element.querySelector('.element__like');

    photo.src = elem.link;
    photo.alt = 'Фото ' + elem.name;
    photo.ariaLabel = 'Фото ' + elem.name;
    elementTitle.textContent = elem.name;
    likeBtn.ariaLabel = 'Поставить лайк фото ' + elem.name;
    elementGrid.append(element);
})
elementGrid.addEventListener('click', event => deleteCard(event))
elementGrid.addEventListener('click', event => popUpImage(event))

/* Перебор массива с параметрами(elem: массив кнопок с классом и func: используемая ими функция) */
buttons.forEach((elemArr) => {
    elemArr.element.addEventListener(elemArr.event, event => elemArr.func(event))
})

/* Переключатель для лайков */
function toggleLikeStatus(event) {
    if (event.target.classList.contains('element__like')) event.target.classList.toggle('element__like_active');
}

function deleteCard(event) {
    if (event.target.classList.contains('element__delete')) event.target.closest('li').remove();
}

function popUpImage(event) {
    console.log(event.target)
    if (event.target.classList.contains('element__photo')) {
        const
            formImage = imageTemplate.content.cloneNode(true),
            popupImage = formImage.querySelector('.popup__image'),
            titleImage = formImage.querySelector('.popup__title'),
            titleElement = event.target.closest('.element').querySelector('.element__title');
        titleImage.textContent = titleElement.textContent
        popUpCloseButton = formImage.querySelector('.popup__close-button')
        popUpCloseButton.addEventListener('click', () => {
            checkPopUpState(false)
        })
        popupImage.src = event.target.src
        popupImage.alt = event.target.alt;
        popupImage.ariaLabel = event.target.ariaLabel;
        checkPopUpState(formImage)
    }
}

/*Функция скрывает или показывает попАп */
function checkPopUpState(form) {
    if (form) {
        popUpModal.append(form)
        popUpModal.classList.add('popup_opened')
        popUpModal.classList.remove('popup_closed')
    } else {
        popUpModal.classList.add('popup_closed')
        setTimeout(function () {
            popUpModal.classList.remove('popup_opened');
            (popUpCloseButton.closest('.popup__wrapper') || popUpCloseButton.closest('.popup__wrapper_image')).remove()
        }, 190);
    }
}

/*Функция Меняет содержимое инпутов и отображает попап */
function openPopUp(event) {
    const
        form = formTemplate.content.cloneNode(true),
        popUpContainer = form.querySelector('.popup__container'),
        popUpPurpose = form.querySelector('.popup__purpose'),
        popUpNamePlace = form.querySelector(".popup__edit[name='name/place']"),
        popUpStatusLink = form.querySelector(".popup__edit[name='status/link']"),
        popUpSaveButton = form.querySelector('.popup__submit-button');
    let purpose;

    popUpCloseButton = form.querySelector('.popup__close-button')

    popUpCloseButton.addEventListener('click', () => {
        checkPopUpState(false)
    })
    popUpContainer.addEventListener('submit', e => {
        e.preventDefault()
        popUpSaveChanges(purpose)
    })

    if (event.target.classList.contains('profile__add-button')) {
        /* если добавляем место, то редактируем цель, обнуляем инпуты и устанавливаем плейсхолдеры */
        purpose = 'place'
        popUpPurpose.textContent = 'Новое место'
        popUpNamePlace.placeholder = 'Название'
        popUpStatusLink.placeholder = 'Ссылка на картинку'
        popUpSaveButton.textContent = 'Создать'
    } else if (event.target.classList.contains('profile__edit-button')) {
        /* если редактируем профиль, то редактируем цель и актуализируем инпуты */
        purpose = 'profile'
        popUpPurpose.textContent = 'Редактировать профиль'
        popUpNamePlace.value = profileName.textContent;
        popUpStatusLink.value = profileStatus.textContent;
        popUpSaveButton.textContent = 'Сохранить'
    }

    /* Отображение попАпа*/
    checkPopUpState(form);
}

/* Функция меняет имя и статус, а также скрывает попАп */
function popUpSaveChanges(purpose) {
    const
        popUpNamePlace = popUpModal.querySelector(".popup__edit[name='name/place']"),
        popUpStatusLink = popUpModal.querySelector(".popup__edit[name='status/link']")

    /* Меняю данные профиля */
    switch (purpose) {
        case 'place': {
            const
                element = elementTemplate.content.cloneNode(true),
                photo = element.querySelector('.element__photo'),
                elementTitle = element.querySelector('.element__title'),
                elementBtn = element.querySelector('.element__like');

            photo.src = popUpStatusLink.value;
            photo.alt = 'Фото ' + popUpNamePlace.value;
            photo.ariaLabel = 'Фото ' + popUpNamePlace.value;
            elementTitle.textContent = popUpNamePlace.value;
            elementBtn.ariaLabel = 'Поставить лайк фото ' + popUpNamePlace.value;

            elementGrid.prepend(element);
            break
        }

        case 'profile': {
            profileName.textContent = popUpNamePlace.value
            profileStatus.textContent = popUpStatusLink.value
            break
        }
    }

    /* Скрываю попап */
    checkPopUpState(false);
}

