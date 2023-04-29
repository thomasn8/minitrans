// token.js

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const credentials = require('./credentials.json');

// Replace with the code you received from Google
// code=4/0AbUR2VO5sYik0JdVccuHem0nRojMh3UQo5FTx7ubll-Fp99tEfggxvZs4Yjn1DMlvt-IkQ&scope=https://www.googleapis.com/auth/gmail.send
const code = '4/0AbUR2VO5sYik0JdVccuHem0nRojMh3UQo5FTx7ubll-Fp99tEfggxvZs4Yjn1DMlvt-IkQ';
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

oAuth2Client.getToken(code).then(({ tokens }) => {
  const tokenPath = path.join(__dirname, 'token.json');
  fs.writeFileSync(tokenPath, JSON.stringify(tokens));
  console.log('Access token and refresh token stored to token.json');
});
