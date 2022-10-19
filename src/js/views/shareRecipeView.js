import View from "./View";

class shareRecipeView extends View{
  _parentEl = document.querySelector('.nav_btn--share');
  _uploadParentEl = document.querySelector('.upload');


  addHandlerUploadUserEmail(handler){
    this._uploadParentEl.addEventListener('submit', function(e){
      e.preventDefault()
      const emailAddr = document.querySelector('.emailField').value;
      handler(emailAddr)
    })
  }

  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
}

export default new shareRecipeView();

const emailAddr = "slwangpwa@gmail.com";
const title = 'an title'

module.exports = {emailAddr, title}
// how to send email:
// https://www.youtube.com/watch?v=-rcRf7yswfM&t=48s