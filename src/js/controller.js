<<<<<<< HEAD
import * as model from './model.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';


const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};


const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
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


const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  paginationView.addHandlerClick(controlPagination);

=======
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
>>>>>>> 9b376441b03ca578429bbe72b32a7d189bad0749
};
init();




/*
////////////发送邮件/////////////////

// const nodemailer = require('nodemailer');
// const { google } = require('googleapis');
import nodemailer from 'nodemailer';
import {google} from 'googleapis';

// These id's and secrets should come from .env file.
const CLIENT_ID = '347847861216-3se11mbfeteegu3i9mrlbhfnqokhveng.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = 'ya29.a0Aa4xrXMUoLsL0N-lztvsUWTVPNfbhJfA_WuCZ1Vr6Xq6AEBlpiDITnUUOrVgzHY5NTIU1tQ7xTWtwrU8tKddduyu0tzIeUKSKDHyWQLxWxjOPNGD4UxTHUYUyKvl01n9lb6UtQucerxfT9IAsyeuFTl_D0PDaCgYKATASARASFQEjDvL9NkgRpvMSNvl17z_PMdGAiA0163';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'wangsh01@luther.edu',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'wangsh01@luther.edu',
      to: 'slwangpwa@gmail.com',
      subject: 'Hello from gmail using API',
      text: 'Hello from gmail email using API',
      html: '<h1>Hello from gmail email using API</h1>',
    };

    const result = await transport.sendMail(mailOptions);
    return result;
    
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));
*/
