/* eslint-disable max-len */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-unused-vars */

const SpotifyWebApi = require('spotify-web-api-node');

const fetch = require('cross-fetch');

const authKey = 'BQCVmyh5R4IBBgCAi4lVGw2CUpkQP0bOc-53kAZr1nABzfnBwDt803r2zApm6PDIEg_B-Q7NACqh9_1O_S9HKROBI6_0mv1_lTtyWvC3y13R9BoAK6N7HfKTDusbNjoiRa7gBxfi_vMRUD8uwNq1-z2mDmKUJcyUm4MTUQJXDI05bUvuUy0-sPCthculY_-I4MaBIIo4hcVDXvV9STK1ltvnLbKPkq8NrMV_sQEgq29AUfayNboCVqOyTsZ1qUfi_vjdFgmP8hDpebd387a8Hf9-8DbWLYjF9ZXePUH7gOQljHQktMzM';

const spotifyID = 'fnh6px78guvi666lyrtmr04p4';
const playlistNameToID = {};

export function CreateSpotifyObjects() {
  const api = new SpotifyWebApi({
    clientId: 'd45e1813a6564588837b5f187309b617',
    clientSecret: '62aa2ebebc3c408cb399bc94e0d03df7',
    redirectUri: 'http://localhost:8888/callback',
  });

  api.setAccessToken(authKey);
  // console.log(`spotify object created with auth token: ${authKey}`);
  return api;
}

// const spotifyApi = new CreateSpotifyObjects(authKey);

export function createPlaylist(api, name) {
  api.createPlaylist(name, { description: 'Description_placeholder', public: true })
    .then((data) => {
      console.log(`Created playlist: ${name} with id: ${data.body.id}`);
      playlistNameToID[name] = data.body.id;
      return data.body.id;
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
