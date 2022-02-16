/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Song from './song';

class PlayList extends Component {
  render() {
    return (
      <div id="playlist-container" className="container">
        <button type="button" id="play-playlist" className="playlist-button">
          <i className="fa-solid fa-circle-play" />
        </button>
        <div id="playlist" className="container">
          <Song />
          <Song />
          <Song />
          <Song />
          <Song />
          <Song />
          <Song />
          <Song />
        </div>
        <button type="button" id="reshuffle-playlist" className="playlist-button">
          <i className="fa-solid fa-arrows-rotate" />
        </button>
      </div>
    );
  }
}

export default PlayList;
