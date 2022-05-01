/* eslint-disable max-len */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-unused-vars */
import { getAuthKey } from './auth';

const SpotifyWebApi = require('spotify-web-api-node');

const fetch = require('cross-fetch');

// Paste auth key generated manually from fetchingAuth.js into this variable to interact with Spotify. Yes, I know it sucks.
const authKey = 'BQDy2brkWVVHtDzaNO__x-Q4WNmZBM9TriPoJcWOFvhfLwwfSKG8U_2hu8EHwtY_3MR7C0TnwZ7Iva4ZIVRoPD01VK7dCAUMM6bBIWaSvuIAX0ERUQ24-9AuqTExAdvz2MyGNP_1GZjTkH741nlxN5UZNt1iKOHMHyRmkGiuB67ltkGSWh4VauFzSEUj0D54p5SqSpJAfInwjsrFjl3cPe6MAAlx3rD5-Rb4PPjBo9i6QRm9koMKUN6SOETrpC6tUhZO7ewtTsKJL2rTS_vUNeLIH8WdM4ykumrQMR-wS4h-4KRVGP35';

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
