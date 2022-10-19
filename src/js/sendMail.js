const mod = require("./../js/views/shareRecipeView")
const nodemailer = require('nodemailer');
const { google } = require('googleapis');




// These id's and secrets should come from .env file.
const CLIENT_ID = '347847861216-3se11mbfeteegu3i9mrlbhfnqokhveng.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = 'ya29.a0Aa4xrXPtPIzydJSyC6D7R3F0yrFzE81XjOP0_uuYFBzAL1AjGyNj8SQM_qeCv8a6WWfh4eoseqnHWouQvGyFFiEWWEnliRfhJbouhI4u_RY1cUtATfGFpPmTLJQ1TTuUgHfbs-PKauTzg0-Qe-tO_xA6VhpeEQaCgYKATASARASFQEjDvL96amfWK9vujNIwlbei_JU8A0165';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
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
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'wangsh01@luther.edu',
      to: mod.emailAddr,
      subject: mod.title,
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