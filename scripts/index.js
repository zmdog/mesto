let popUpModal = document.querySelector(".popup"),
    buttons = [
        {element: document.querySelectorAll('.elements__elements-grid'), event: 'click', func: likeStatus},
        {element: document.querySelectorAll('.popup__save-button'), event: 'submit', func: popUpSaveChanges},
        {element: document.querySelectorAll('.profile__edit-button'), event: 'click', func: popUpOpen},
        {element: document.querySelectorAll('.popup__close-button'), event: 'click', func: popUpState},
        {
            element: document.querySelectorAll('.profile__add-button'),
            event: 'click',
            func: () => console.log("В разработке")
        },
    ]

/* Перебор массива с параметрами(elem: массив кнопок с классом и func: используемая ими функция) */
buttons.map((elemArr) => {

    /*далее перебираю массив кнопок с классами и присваиваю им функцию из массива с параметрами*/
    elemArr.element.forEach((elemClass) => {

        elemClass.addEventListener(elemArr.event, () => elemArr.func())
    })
})

/* Подвязка слушателя к таблице */
document.querySelector('.elements__elements-grid').addEventListener('click', likeStatus)

/* Переключатель для лайков. Выводит ошибку*/
function likeStatus (event) {

    if (event.target.classList.contains('element__like')) event.target.classList.toggle('element__like_active')
}

/*Функция скрывает или показывает попАп */
function popUpState() {
    document.querySelector('.popup_opened')?
        popUpModal.classList.remove('popup_opened') :
        popUpModal.classList.add('popup_opened');
}

/*Функция Меняет содержимое инпутов и отображает попап */
function popUpOpen() {
    let profileName = document.querySelector(".profile__name"),
        profileStatus = document.querySelector(".profile__status");

    /* Меняю содержимое инпутов */
    document.querySelector(".popup__edit[name='name']").value = profileName.textContent;
    document.querySelector(".popup__edit[name='status']").value = profileStatus.textContent;

    /* Отображение попАпа*/
    popUpState();
}

/* Функция меняет имя и статус, а также скрывает попАп */
function popUpSaveChanges() {

    let profileName = document.querySelector(".popup__edit[name='name']"),
        profileStatus = document.querySelector(".popup__edit[name='status']");

    /* Меняю данные профиля */
    document.querySelector(".profile__name").innerHTML = profileName.value;
    document.querySelector(".profile__status").innerHTML = profileStatus.value;

    /* Скрываю попап */
    popUpState();
}
