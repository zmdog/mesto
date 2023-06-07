let popUpModal = document.querySelector(".popup"),
    buttons = [
        {element: document.querySelectorAll('.elements__elements-grid'), event: 'click', func: likeStatus},
        {element: document.querySelectorAll('.popup__container'), event: 'submit', func: popUpSaveChanges},
        {element: document.querySelectorAll('.profile__edit-button'), event: 'click', func: popUpOpen},
        {element: document.querySelectorAll('.popup__close-button'), event: 'click', func: popUpState},
        {
            element: document.querySelectorAll('.profile__add-button'),
            event: 'click',
            func: () => console.log("В разработке")
        },
    ];
const
    PROFILE_NAME = document.querySelector(".profile__name"),
    PROFILE_STATUS = document.querySelector(".profile__status"),
    PROFILE_NAME_POPUP = document.querySelector(".popup__edit[name='name']"),
    PROFILE_STATUS_POPUP = document.querySelector(".popup__edit[name='status']");

/* Перебор массива с параметрами(elem: массив кнопок с классом и func: используемая ими функция) */
buttons.map((elemArr) => {

    /*далее перебираю массив кнопок с классами и присваиваю им функцию из массива с параметрами*/
    elemArr.element.forEach((elemClass) => {

        elemClass.addEventListener(elemArr.event, (event) => elemArr.func(event));
    })
})

/* Переключатель для лайков. Выводит ошибку*/
function likeStatus (event) {

    if (event.target.classList.contains('element__like')) event.target.classList.toggle('element__like_active');
}

/*Функция скрывает или показывает попАп */
function popUpState() {

    popUpModal.classList.contains('popup_opened')?
        popUpModal.classList.toggle('popup_opened') :
        popUpModal.classList.toggle('popup_opened');
}

/*Функция Меняет содержимое инпутов и отображает попап */
function popUpOpen() {

    /* Меняю содержимое инпутов */
    document.querySelector(".popup__edit[name='name']").value = PROFILE_NAME.textContent;
    document.querySelector(".popup__edit[name='status']").value = PROFILE_STATUS.textContent;

    /* Отображение попАпа*/
    popUpState();
}

/* Функция меняет имя и статус, а также скрывает попАп */
function popUpSaveChanges(event) {
    event.preventDefault()

    /* Меняю данные профиля */
    document.querySelector(".profile__name").textContent = PROFILE_NAME_POPUP.value;
    document.querySelector(".profile__status").textContent = PROFILE_STATUS_POPUP.value;

    /* Скрываю попап */
    popUpState();
}
