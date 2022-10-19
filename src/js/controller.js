import * as model from "./model.js"
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView.js";
import shareRecipeView from "./views/shareRecipeView";


const recipeContainer = document.querySelector('.recipe');


const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1);

    if(!id) return;
    recipeView.renderSpinner(); //from View.js main class

    resultsView.update(model.getSearchResultsPage())

    // bookmark

    // load recipe
    await model.loadRecipe(id)

    // rendering recipe
    recipeView.render(model.state.recipe)
  }catch(err){

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

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

//////////////////share//////////////
let curUrl;
let titleOfUrl;
let emailAddrs;

function controlGetEmail(emailAddr){
  curUrl = window.location.href;
  titleOfUrl = model.state.recipe.title;
  emailAddrs = emailAddr;

  // Share recipe to user email
  // shareRecipeView.shareCurPage(url, model.state.recipe.title, emailAddrs);
  
}


const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults)
  // shareRecipeView.addHandlerShare(controlShare)
  shareRecipeView.addHandlerUploadUserEmail(controlGetEmail)
};
init();
