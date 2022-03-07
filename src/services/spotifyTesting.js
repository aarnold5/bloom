/* eslint-disable max-len */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-unused-vars */

const SpotifyWebApi = require('spotify-web-api-node');

const fetch = require('cross-fetch');

const authKey = 'BQBdZ6Frlwbt8mwymPBLQBosivp6WSXXmciye0PO_cuS4HUtKP8RSiQsX1xy3JHUsgHflrOpj34n3iGYayKvwaVPxFlws-4VlTjhOq_XfRT-eIRQWHwIQHCRqa8GxQrvKi1rk8WSfRjzqtLzICS8Iy6ocinXbK7QdWjpGpTwTk2YWnZZasr8OECmJ7zNR272pZOdGxIlauS7ilVDBjCrAqSzRCiGzbMct8pq2wmanZkImR6j4wvvkr2LuBtxhosBprD4T9l_7lIILKYmaq6tWKd8dE75HMxN2cJzpUAK-F97nMdFjwnI';

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
