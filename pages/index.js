const button = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const poupCloseButton = document.querySelector('.popup__close-button');

button.addEventListener('click', function() {
    popup.classList.remove('popup_hidden');
});

poupCloseButton.addEventListener('click', function closePopup() {
    popup.classList.add('popup_hidden');
});

let profileTitle = document.querySelector('.profile__title');
let inputTitle = document.querySelector('.popup__input-name');
inputTitle.setAttribute('value', profileTitle.textContent)


let profileSubtitle = document.querySelector('.profile__subtitle');
let inputSubtitle = document.querySelector('.popup__input-job')
inputSubtitle.setAttribute('value', profileSubtitle.textContent)


let formElement = document.querySelector('#form');
function formSubmitHandler (evt) {
    evt.preventDefault();

    /*
    inputTitle.getAttribute('value');
    inputSubtitle.getAttribute('value');
    */

    profileTitle.textContent = inputTitle.value;
    profileSubtitle.textContent = inputSubtitle.value;

    popup.classList.add('popup_hidden');
}
formElement.addEventListener('submit', formSubmitHandler); 
