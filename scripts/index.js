/* объявил все попапы */
const popupProfile = document.querySelector('.popup-profile');
const popupCard = document.querySelector('.popup-card');
const popupPic = document.querySelector('.popup-picture');

//объявил название месста и ссылки на изображение в попапе с картинкой
const popupPicText =  document.querySelector('.popup-picture__text');
const popupPicImage = document.querySelector('.popup-picture__image');

//объявил имя и профессию
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
//объявил поля ввода для имени профессии
const inputTitle = document.querySelector('.popup__input_type_name');
const inputSubtitle = document.querySelector('.popup__input_type_job')

//объявляю поля ввода для названия места и ссылки на фото
const inputPlace = document.querySelector('.popup__input_type_place');
const inputUrl = document.querySelector('.popup__input_type_url');

//объявляю список с элементами грида карточек
const listElements = document.querySelector('.elements');

//объявил темплейт элемент карточки
const cardTemplate = document.querySelector('#card').content;

// объявил кнопки редактирования, добавления карточки
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

// объявил кнопки закрытия попапов 
const popupProfileCloseButton = document.querySelector('.popup-profile__close-button');
const popupCardCloseButton = document.querySelector('.popup-card__close-button');
const popupPicCloseButton = document.querySelector('.popup-picture__close-button');

//объявил формы для ввода данных для редактирования профиля и добавления карточки
const formElementCard = document.querySelector('#form-card');
const formElementProfile = document.querySelector('#form-profile');

// функциии открытия попапов
function openPopup (popup) {
  popup.classList.add('popup_opened');
}  

function showPopupProfile () {
    openPopup (popupProfile);
    inputSubtitle.value = profileSubtitle.textContent;
    inputTitle.value = profileTitle.textContent;
}
profileEditButton.addEventListener('click', showPopupProfile);

cardAddButton.addEventListener('click', function () {
  openPopup(popupCard)
});

//функции закрытия всех попапов с обработчиками кликов по ним
function closePopup (popup) {
    popup.classList.remove('popup_opened');
};
popupCardCloseButton.addEventListener('click', function (){
  closePopup(popupCard);
});
popupProfileCloseButton.addEventListener('click', function (){
  closePopup(popupProfile);
});
popupPicCloseButton.addEventListener('click', function (){
  closePopup(popupPic);
});

// объявил форму профиля, повесил на кнопку сабмита изменение имени и работы, и закрытие попапа при сабмите
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = inputTitle.value;
    profileSubtitle.textContent = inputSubtitle.value;
    closePopup(popupProfile);
};
formElementProfile.addEventListener('submit', handleProfileFormSubmit); 

//функция открытия попапа картинки
function addPopupPic (item) {
  openPopup(popupPic);
  popupPicImage.src = item.link;
  popupPicImage.alt = item.name;
  popupPicText.textContent = item.name;

};

//функция добавления лайка
function addLike (evt) {
  evt.target.classList.toggle('element__like_active');
}
//функция удаления карточки
function deleteCard (evt) {
  evt.target.closest('.element').remove();
}
//функция вставления карточки в начало
function addInBegin (item) {
  listElements.prepend(item);
}
//функция добавления карточек из массива и ее вызов для всех его элементов
function renderItem (item) {
    const newCard = cardTemplate.cloneNode(true); //клонировал карточку
    newCard.querySelector('.element__text').textContent = item.name; //добавил название места
    const cardImage = newCard.querySelector('.element__image');
    cardImage.src = item.link; //добавил линк картинки
    cardImage.alt = item.name; //добавил alt
    //добавление лайка по обработчику клика
    newCard.querySelector('.element__like').addEventListener('click', addLike);
    //удаление карточки по обработчику клика
    newCard.querySelector('.element__delete').addEventListener('click', deleteCard);
    //открытие попапа с увеличенной картинкой по клику
    cardImage.addEventListener('click', function () {
      addPopupPic (item);
    });
    return(newCard);
};
//добавил карточки по данным из массива
initialCards.forEach(function (item) {
  addInBegin(renderItem(item));
});

//функция создания карточки, после неё обработчик на сабмит для добавления
function createItem (evt) {
    evt.preventDefault();
    //объеденил данные названия места и ссылки, чтобы повторно использовать функцию renderItem
    const inputsValue = {
      name: inputPlace.value,
      link: inputUrl.value
    };
    addInBegin(renderItem (inputsValue)); //добавляю в начало
    closePopup(popupCard);
    formElementCard.reset();
};
formElementCard.addEventListener('submit', createItem); 
