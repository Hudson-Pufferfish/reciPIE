import View from './View.js';
<<<<<<< HEAD
import icons from 'url:../../img/icons.svg'; // Parcel 2
=======
>>>>>>> 9b376441b03ca578429bbe72b32a7d189bad0749

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${
          this._data.id === id ? 'preview__link--active' : ''
        }" href="#${this._data.id}">
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated ${
              this._data.key ? '' : 'hidden'
            }">
              <svg>
<<<<<<< HEAD
              <use href="${icons}#icon-user"></use>
=======
                <i class="fa-solid fa-user-group"></i>
>>>>>>> 9b376441b03ca578429bbe72b32a7d189bad0749
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
  }
}

<<<<<<< HEAD
export default new PreviewView();
=======
export default new PreviewView();
>>>>>>> 9b376441b03ca578429bbe72b32a7d189bad0749
