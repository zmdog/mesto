let classPopUp = new PopUp()
function PopUp() {

    this.popUpModal = document.querySelector(".popup")

    this.popUpShow = function() {
        /* Достаю инпуты, для актуализации */
        this.popUpName = document.querySelector(".popup__edit-name")
        this.popUpStatus = document.querySelector(".popup__edit-status")
        /* Меняю содержимое инпутов*/
        this.popUpName.value = this.popUpInputPlaceHolder(".profile__name");
        this.popUpStatus.value = this.popUpInputPlaceHolder(".profile__status")

        /* Отображение попАпа*/
        this.popUpState()
    }

    /* Функция меняет имя и статус, а также скрывает попАп */
    this.popUpSaveChanges = function(){
        /* Достаю элементы, содержимое которых хочу заменить */
        this.popUpName = document.querySelector(".profile__name")
        this.popUpStatus = document.querySelector(".profile__status")

        /* Меняю данные */
        this.popUpName.innerHTML = this.popUpInputPlaceHolder(".popup__edit-name");
        this.popUpStatus.innerHTML = this.popUpInputPlaceHolder(".popup__edit-status")
        this.popUpState()
    }

    /* Функция возвращает текст передаваемого класса элемента с унифицированным применением*/
    this.popUpInputPlaceHolder = function(targetClass){
        let element = document.querySelector(`${targetClass}`)
        /* Проверка на наличие аттрибута*/
        if(element.value) return element.value
        return element.innerHTML
    }

    /* Функция скрывает или показывает попАп */
    this.popUpState = function(){
        this.popUpModal.classList.toggle('popup_opened')
    }
}