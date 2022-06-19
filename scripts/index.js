/* объявил все попапы */
const popupProfile = document.querySelector('.popup-profile');
const popupCard = document.querySelector('.popup-card');
const popupPic = document.querySelector('.popup-picture');
const popup = document.querySelector('.popup');

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
const CardAddButton = document.querySelector('.profile__add-button');

// объявил кнопки закрытия попапов 
const popupProfileCloseButton = document.querySelector('.popup-profile__close-button');
const popupCardCloseButton = document.querySelector('.popup-card__close-button');
const popupPicCloseButton = document.querySelector('.popup-picture__close-button');

//объявил формы для ввода данных для редактирования профиля и добавления карточки
const formElementCard = document.querySelector('#form-card');
const formElementProfile = document.querySelector('#form-profile');

// функциии открытия всех попапов
function popupProfileShow () {
    popupProfile.classList.remove('popup_hidden');
    inputSubtitle.value = profileSubtitle.textContent;
    inputTitle.value = profileTitle.textContent;
}
profileEditButton.addEventListener('click', popupProfileShow);

function popupCardShow () {
    popupCard.classList.remove('popup_hidden'); 
}
CardAddButton.addEventListener('click', popupCardShow);

function popupPicShow () {
    popupPic.classList.remove('popup_hidden');
};

//функции закрытия всех попапов с обработчиками кликов по ним
function profileClose () {
    popupProfile.classList.add('popup_hidden');
};
function addCardClose () {
  popupCard.classList.add('popup_hidden');
};
function picClose () {
  popupPic.classList.add('popup_hidden');
};
popupCardCloseButton.addEventListener('click', addCardClose);
popupProfileCloseButton.addEventListener('click', profileClose);
popupPicCloseButton.addEventListener('click', picClose);

// объявил форму профиля, повесил на кнопку сабмита изменение имени и работы, и закрытие попапа при сабмите
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = inputTitle.value;
    profileSubtitle.textContent = inputSubtitle.value;
    profileClose ();
};
formElementProfile.addEventListener('submit', formSubmitHandler); 

//функция открытия попапа картинки
function addPopupPic (item) {
  popupPicImage.src = item.link;
  popupPicText.innerText = item.name;
  popupPicShow ();
};

//функция добавления карточек из массива и ее вызов для всех его элементов
function renderItem (item) {
    const newCard = cardTemplate.cloneNode(true); //клонировал карточку
    newCard.querySelector('.element__text').innerText = item.name; //добавил название места
    const cardImage = newCard.querySelector('.element__image');
    cardImage.src = item.link; //добавил линк картинки
    //добавление лайка по обработчику клика
    newCard.querySelector('.element__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like_active');
    });
    //удаление карточки по обработчику клика
    newCard.querySelector('.element__delete').addEventListener('click', function (evt) {
      evt.target.closest('.element').remove();
    });
    //открытие попапа с увеличенной картинкой по клику
    cardImage.addEventListener('click', function () {
      addPopupPic (item);
    });
    //добавление в начало списка
    listElements.prepend(newCard);
};
initialCards.forEach(renderItem); //добавил карточки по данным из массива

//функция создания карточки, после неё обработчик на сабмит для добавления
function createItem (evt) {
    evt.preventDefault();
    //объеденил в массив данные названия места и ссылки, чтобы повторно использовать функцию renderItem
    const inputArray = {
      name: inputPlace.value,
      link: inputUrl.value
    };
    renderItem (inputArray);
    addCardClose ();
};
formElementCard.addEventListener('submit', createItem);