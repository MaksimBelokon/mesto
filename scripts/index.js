/* объявил сам попап */
const popup = document.querySelector('.popup');


/* объявил значение имени и форму имени в попапе => занес изначально заданное значение имени в попап */
let profileTitle = document.querySelector('.profile__title');
let inputTitle = document.querySelector('.popup__input_type_name');
inputTitle.value = profileTitle.textContent;

/* объявил значение работы и форму работы в попапе => занес изначальное заданное значение работы в попап */
let profileSubtitle = document.querySelector('.profile__subtitle');
let inputSubtitle = document.querySelector('.popup__input_type_job')
inputSubtitle.value = profileSubtitle.textContent;

/* объявил кнопку редактирования */
const profileEditButton = document.querySelector('.profile__edit-button');

/* функция открытия попапа по клику на кнопку редактирования */
function popupShow () {
    popup.classList.remove('popup_hidden');
    inputSubtitle.value = profileSubtitle.textContent;
    inputTitle.value = profileTitle.textContent;
}
profileEditButton.addEventListener('click', popupShow);


/* объявил кнопку закрытия попапа */
const popupCloseButton = document.querySelector('.popup__close-button');

/* функция закрытия попапа по клику на кнопку закрытия */
function popupClose () {
    popup.classList.add('popup_hidden');
}
popupCloseButton.addEventListener('click', popupClose)


/* объявил форму, повесил на кнопку сабмита изменение имени и работы, и закрытие попапа */
let formElement = document.querySelector('#form');
function formSubmitHandler (evt) {
    evt.preventDefault();

    profileTitle.textContent = inputTitle.value;
    profileSubtitle.textContent = inputSubtitle.value;

    popupClose ();
}
formElement.addEventListener('submit', formSubmitHandler); 



