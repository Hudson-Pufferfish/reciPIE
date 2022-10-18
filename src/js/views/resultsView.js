import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

<<<<<<< HEAD
=======
// view of search results 
>>>>>>> 9b376441b03ca578429bbe72b32a7d189bad0749
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

<<<<<<< HEAD
export default new ResultsView();
=======
export default new ResultsView();
>>>>>>> 9b376441b03ca578429bbe72b32a7d189bad0749
