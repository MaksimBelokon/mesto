const validationObj = {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input-red',
    errorClass: 'popup__input-error_active'
  };

//показать сообщение об ошибке, находим класс именн овнутри функции
function showInputError (formElement, inputElement, errorMessage) {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    console.log(`.${inputElement.id}-error`);
    inputElement.classList.add(validationObj.inputErrorClass);
    inputError.textContent = errorMessage;
    inputError.classList.add(validationObj.errorClass);
  };
//спрятать сообщение
function hideInputError (formElement, inputElement) {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationObj.inputErrorClass);
    inputError.classList.remove(validationObj.errorClass);
    inputError.textContent = '';
  };

//проверяем валидна ли форма, и включаем или прячем сообщение об ошибке
function isValid (formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};
 //проверяем все поля на валидность
 const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    })
  };

//включаем/выключаем кнопку
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute("disabled",true);
    } else {
      buttonElement.removeAttribute("disabled");
    }
  }; 

//проверка валидности всех инпутов в форме, здесь же смотрим активна ли кнопка
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationObj.inputSelector));
    const buttonElement = formElement.querySelector(validationObj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          isValid(formElement, inputElement);
          toggleButtonState(inputList, buttonElement);
        });
      });
};

//включаем валидацию для всех форм
const enableValidation = (validationObj) => {
    const formList = Array.from(document.querySelectorAll(validationObj.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
  };
enableValidation(validationObj); 



  