export class FormValidator {
    constructor(validationObj, formElement){
        this._validationObj = validationObj;
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(this._validationObj.inputSelector));
        this._buttonElement = formElement.querySelector(this._validationObj.submitButtonSelector);
    }
    //показываем ошибку
    _showInputError (inputElement, errorMessage) {
        const inputError = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validationObj.inputErrorClass);
        inputError.textContent = errorMessage;
        inputError.classList.add(this._validationObj.errorClass);
      };
    //прячем ошибку
    _hideInputError (inputElement) {
        const inputError = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validationObj.inputErrorClass);
        inputError.classList.remove(this._validationObj.errorClass);
        inputError.textContent = '';
      };

    //проверка валидности формы
    _isValid (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

     //проверяем все поля на валидность
    _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    })
    };
    //включаем/выключаем кнопку
    _toggleButtonState () {
        if (this._hasInvalidInput()) {
            this._buttonElement.setAttribute("disabled",true);
            this._buttonElement.classList.add('button__disabled');
        } else {
            this._buttonElement.removeAttribute("disabled");
            this._buttonElement.classList.remove('button__disabled');
        }
      }; 
    //обработчики на поля ввода, проверка валидности всех инпутов в форме, здесь же смотрим активна ли кнопка
    _setEventListeners () {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
              this._isValid(inputElement);
              this._toggleButtonState();
            });
          });
    };
    //публичный метод enableValidation, который включает валидацию формы.
    enableValidation() {
        this._setEventListeners();
    }
}
