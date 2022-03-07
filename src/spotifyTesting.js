/* eslint-disable max-len */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-unused-vars */

const SpotifyWebApi = require('spotify-web-api-node');

const fetch = require('cross-fetch');

const authKey = 'BQB_13tbxFf_Uw7XDiIPNdbKSnu2wSC0wMdrHEPGa6vXTJygz8i-p1Zjm2QQP6NimEbJxT1V4xHiOQgvCwpO0J_WHzXlAKnZeHKFaMb3x-mpghzWly4Mx2rYrl3rc2VcPLFB4m5R_S0lTxsKmZDNENuVgtKxReitXkDrnRrnPeufZXb26fB4yxJN3XNtA3dAk_CcuKtyN6V1az3vsawCQTNM9Q529GgIDyRNZEJjUo5AkKYY9gb5SDty5RahGnIQ_AX92SBx8mDz2Uj2sKL07UrOE9jEfzHjiOyqPmGwHXTrGWANn1yw';

const spotifyID = 'fnh6px78guvi666lyrtmr04p4';
const playlistNameToID = {};

export function CreateSpotifyObjects() {
  const api = new SpotifyWebApi({
    clientId: 'd45e1813a6564588837b5f187309b617',
    clientSecret: '62aa2ebebc3c408cb399bc94e0d03df7',
    redirectUri: 'http://localhost:8888/callback',
  });

  api.setAccessToken(authKey);
  console.log(`spotify object created with auth token: ${authKey}`);
  return api;
}

const spotifyApi = new CreateSpotifyObjects(authKey);

export function createPlaylist(api, name) {
  api.createPlaylist(name, { description: 'Description_placeholder', public: true })
    .then((data) => {
      console.log(`Created playlist: ${name} with id: ${data.body.id}`);
      playlistNameToID[name] = data.body.id;
    }, (err) => {
      console.log('Something went wrong!', err);
    });
}

export function addTracksToPlaylist(api, playlistID, songArray) {
  const newArray = [];
  for (let i = 0; i < songArray.length; i++) {
    if (songArray[i] != null) {
      newArray.push(`spotify:track:${songArray[i]}`);
    }
  }

  api.addTracksToPlaylist(playlistID, newArray)
    .then((data) => {
      console.log(`Added tracks to playlist: ${playlistID}`);
    }, (err) => {
      console.log('Something went wrong!', err);
    });
}
