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

/*
returns the id of song given the track name and artist
 */
function findSongID(track, artist, api) {
  // Search for tracks with given track name and artist name
  api.searchTracks(`track:${track} artist:${artist}`)
    .then((data) => {
      // console.log(data.body['tracks']['items'][0]['id']);
      const { id } = data.body.tracks.items[0]; // song id for pulling metadata.
      console.log(id);
    }, (err) => {
      console.error(err);
    });
}

/* returns an artist's spotify ID given just their name. Used for finding top tracks with an artist ID.
   */
async function findArtistID(api, artist) {
  api.searchArtists(artist)
    .then(async (data) => {
      const id = await data.body.artists.items[0].id;
      console.log(`${artist}: ${id}`);
      return id;
    }, (err) => {
      console.error(err);
    });
}

export function getMe(api) {
  api.getMe()
    .then((data) => {
      console.log(data.body.id);
    }, (err) => {
      console.log('Something went wrong!', err);
    });
}
