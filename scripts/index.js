import { initialCards, Card } from './card.js';
import { validationObj, FormValidator } from './FormValidator.js';

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

// объявил кнопки редактирования, добавления карточки
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

//объявил формы для ввода данных для редактирования профиля и добавления карточки
const formElementCard = document.querySelector('#form-card');
const formElementProfile = document.querySelector('#form-profile');

// функциии открытия попапов
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown',  closeByEsc);
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
    document.removeEventListener('keydown',  closeByEsc)
};

//проверка и выключчение активности кнопки
function checkButtonActivity (popup) {
  const buttonElement = popup.querySelector(validationObj.submitButtonSelector);
    if(!(buttonElement.classList.contains('button__disabled'))){
      buttonElement.setAttribute("disabled",true);
    };
}

// объявил форму профиля, повесил на кнопку сабмита изменение имени и работы, и закрытие попапа при сабмите
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = inputTitle.value;
    profileSubtitle.textContent = inputSubtitle.value;
    checkButtonActivity(popupProfile);
    closePopup(popupProfile);
};
formElementProfile.addEventListener('submit', handleProfileFormSubmit); 

//функция открытия попапа картинки
function openPopupPic (item) {
  openPopup(popupPic);
  popupPicImage.src = item.link;
  popupPicImage.alt = item.name;
  popupPicText.textContent = item.name;
};

//функция добавления карточек из массива и ее вызов для всех его элементов
// function renderItem (item) {
//     const newCard = cardTemplate.cloneNode(true); //клонировал карточку
//     newCard.querySelector('.element__text').textContent = item.name; //добавил название места
//     const cardImage = newCard.querySelector('.element__image');
//     cardImage.src = item.link; //добавил линк картинки
//     cardImage.alt = item.name; //добавил alt
//     //добавление лайка по обработчику клика
//     newCard.querySelector('.element__like').addEventListener('click', addLike);
//     //удаление карточки по обработчику клика
//     newCard.querySelector('.element__delete').addEventListener('click', deleteCard);
//     //открытие попапа с увеличенной картинкой по клику
//     cardImage.addEventListener('click', function () {
//       openPopupPic (item);
//     });
//     return(newCard);
// };
// функция добавления карточек с помощью класса, и в начало
function renderItem (item) {
const card = new Card(item, '#card', openPopupPic);
  const cardElement = card.generateCard();
  listElements.prepend(cardElement);
};

//добавил карточки по данным из массива
initialCards.forEach((item) => {
  renderItem (item);
});

//функция создания новой карточки, после неё обработчик на сабмит для добавления
function createCard (evt) {
    evt.preventDefault();
    //объеденил данные названия места и ссылки, чтобы повторно использовать функцию renderItem
    const inputsValue = {
      name: inputPlace.value,
      link: inputUrl.value
    };
    renderItem (inputsValue); //обработка из класса
    checkButtonActivity(popupCard);
    closePopup(popupCard);
    formElementCard.reset();
};
formElementCard.addEventListener('submit', createCard); 

//закрытие попапов по лику на оверлей и крестику
const popups = document.querySelectorAll('.popup')
popups.forEach( function (popup) {
  popup.addEventListener('mousedown', function (evt) {
    if(evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
});
popups.forEach( function (popup) {
  popup.addEventListener('click', function (evt) {
    if(evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

const ESC_CODE = 'Escape';
function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}

// Валидация форм
const formCard = new FormValidator(validationObj, formElementCard);
formCard.enableValidation();

const formProfile = new FormValidator(validationObj, formElementProfile);
formProfile.enableValidation();