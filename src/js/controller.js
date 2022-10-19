import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import resultsView from "./views/resultsView.js";
import moreView from "./views/moreView";
import getDefi from "./defi"

import { async } from 'regenerator-runtime';



const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1);

    if(!id) return;
    recipeView.renderSpinner(); //from View.js main class

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage())

    // bookmark
    bookmarksView.update(model.state.bookmarks);

    // load recipe
    await model.loadRecipe(id)

    // rendering recipe
    recipeView.render(model.state.recipe)
  } catch(err){
    recipeView.renderError();
    console.error(err);
  }
}


const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};


//////////////////share//////////////
let curUrl;
let titleOfUrl;
let emailAddrs;

const controlGetEmail = function (emailAddr) {
  curUrl = window.location.href;
  titleOfUrl = model.state.recipe.title;
  emailAddrs = emailAddr;

  // Share recipe to user email
  // shareRecipeView.shareCurPage(url, model.state.recipe.title, emailAddrs);
  
}

function controlGetDefi(){
  const title = model.state.recipe.title;
  if (!title) return;
  const word = title.split(' ')[0];
  getDefi(word);
}


const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  moreView.addHandlerMoreAPI(controlGetDefi);
};
init();

