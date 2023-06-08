let popUpModal = document.querySelector(".popup"),
    buttons = [
        {element: document.querySelectorAll('.elements__elements-grid'), event: 'click', func: toggleLikeStatus},
        {element: document.querySelectorAll('.popup__container'), event: 'submit', func: popUpSaveChanges},
        {element: document.querySelectorAll('.profile__edit-button'), event: 'click', func: openPopUp},
        {element: document.querySelectorAll('.popup__close-button'), event: 'click', func: checkPopUpState},
        {
            element: document.querySelectorAll('.profile__add-button'),
            event: 'click',
            func: () => console.log("В разработке")
        },
    ];
const
    profileName = document.querySelector(".profile__name"),
    profileStatus = document.querySelector(".profile__status"),
    profileNamePopUp = document.querySelector(".popup__edit[name='name']"),
    profileStatusPopUp = document.querySelector(".popup__edit[name='status']");

/* Перебор массива с параметрами(elem: массив кнопок с классом и func: используемая ими функция) */
buttons.map((elemArr) => {

    /*далее перебираю массив кнопок с классами и присваиваю им функцию из массива с параметрами*/
    elemArr.element.forEach((elemClass) => {

        elemClass.addEventListener(elemArr.event, (event) => elemArr.func(event));
    })
})

/* Переключатель для лайков */
function toggleLikeStatus (event) {

    if (event.target.classList.contains('element__like')) event.target.classList.toggle('element__like_active');
}

/*Функция скрывает или показывает попАп */
function checkPopUpState() {

    popUpModal.classList.toggle('popup_opened');
}

/*Функция Меняет содержимое инпутов и отображает попап */
function openPopUp() {

    /* Меняю содержимое инпутов */
    profileNamePopUp.value = profileName.textContent;
    profileStatusPopUp.value = profileStatus.textContent;

    /* Отображение попАпа*/
    checkPopUpState();
}

/* Функция меняет имя и статус, а также скрывает попАп */
function popUpSaveChanges(event) {
    event.preventDefault();

    /* Меняю данные профиля */
    profileName.textContent = profileNamePopUp.value;
    profileStatus.textContent = profileStatusPopUp.value;

    /* Скрываю попап */
    checkPopUpState();
}
