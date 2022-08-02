export class Card {
    constructor(item, templateSelector, openPopupPic){
        this._openPopupPic = openPopupPic;
        this._item = item;
        this._name = item.name;
        this._link = item.link;
        this._templateSelector = templateSelector;
    }

    //достали разметку
    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element').cloneNode(true);
        return cardElement;
    }
    //создание карточки
    generateCard() {
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardElement.querySelector('.element__text').textContent = this._name;
        this._likeButton = this._cardElement.querySelector('.element__like');
        this._deleteButton = this._cardElement.querySelector('.element__delete');
        this._setEventListeners();
        return this._cardElement;
    }
    //функция лайка
    _addLike() {
        this._likeButton.classList.toggle('element__like_active');
    }  
    _deleteCard() {
        this._deleteButton.closest('.element').remove();
    }
    //все обработчики
    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
          this._addLike();
        });
        this._deleteButton.addEventListener('click', () => {
          this._deleteCard();
        });
        this._cardImage = this._cardElement.querySelector('.element__image').addEventListener('click', () => {
          this._openPopupPic(this._item);
        });
      }
}
