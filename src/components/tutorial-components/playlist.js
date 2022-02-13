/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Song from './song';

class PlayList extends Component {
  render() {
    return (
      <div id="playlist-container" className="container">
        <button type="button" id="play-playlist" className="playlist-button">a</button>
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
        <button type="button" id="reshuffle-playlist" className="playlist-button">a</button>
      </div>
    );
  }
}

export default PlayList;
