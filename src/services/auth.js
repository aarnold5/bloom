/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/prefer-default-export

import SpotifyWebApi from 'spotify-web-api-node';
import express from 'express';
import fetch from 'cross-fetch';

// This file is based off of code from: https://github.com/thelinmichael/spotify-web-api-node/blob/master/examples/tutorial/00-get-access-token.js

const spotifyApi = new SpotifyWebApi({
  clientId: 'd45e1813a6564588837b5f187309b617',
  clientSecret: '62aa2ebebc3c408cb399bc94e0d03df7',
  redirectUri: 'http://localhost:8888/callback',
});

// eslint-disable-next-line import/prefer-default-export
export async function getAuthKey() {
  const authKey = await new Promise((resolve, reject) => {
    const scopes = [
      'ugc-image-upload',
      'user-resad-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'streaming',
      'app-remote-control',
      'user-read-email',
      'user-read-private',
      'playlist-read-collaborative',
      'playlist-modify-public',
      'playlist-read-private',
      'playlist-modify-private',
      'user-library-modify',
      'user-library-read',
      'user-top-read',
      'user-read-playback-position',
      'user-read-recently-played',
      'user-follow-read',
      'user-follow-modify',
    ];

    // credentials are optional

    const app = express();

    app.get('/login', (req, res) => {
      res.redirect(spotifyApi.createAuthorizeURL(scopes));
    });

    app.get('/callback', (req, res) => {
      const { error } = req.query;
      const { code } = req.query;
      const { state } = req.query;

      if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        reject(error);
        return;
      }

      spotifyApi
        .authorizationCodeGrant(code)
        .then((data) => {
          // eslint-disable-next-line camelcase
          const { access_token } = data.body;
          const { refresh_token } = data.body;
          const { expires_in } = data.body;

          spotifyApi.setAccessToken(access_token);
          spotifyApi.setRefreshToken(refresh_token);

          let auth = data.body.access_token;
          // console.log(authKey)
          // console.log(refresh_token)

          resolve(authKey);
          console.log(
            `Successfully retrieved access token. Expires in ${expires_in} s.`,
          );

          res.send('Success! You can now close the window.');

          setInterval(async () => {
            const data = await spotifyApi.refreshAccessToken();
            const access_token = await data.body.access_token;

            console.log('The access token has been refreshed!');
            console.log('access_token:', access_token);
            auth = access_token; // resetting the saved variable for later use

            spotifyApi.setAccessToken(access_token);
          }, expires_in / (2 * 1000));
        })
        .catch((error) => {
          console.error('Error getting Tokens:', error);
          res.send(`Error getting Tokens: ${error}`);
          reject(error);
        });
    });
    app.listen(8888, () => console.log(
      'HTTP Server up. Now go to http://localhost:8888/login in your browser.',
    ));
  });
} // end of main function
