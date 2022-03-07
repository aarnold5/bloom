/* eslint-disable class-methods-use-this */
/* eslint-disable new-cap */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Song from './song';
import * as spt from '../../spotifyTesting';

class PlayList extends Component {
  constructor(props) {
    super(props);
    this.state = {}; // nothing here yet
  }

  runSpotifyMethods = () => {
    const spotifyApi = spt.CreateSpotifyObjects();
    spt.createPlaylist(spotifyApi, 'React Text Playlist');
  };

  render() {
    return (
      <div id="playlist-container" className="container">
        <button type="button" id="play-playlist" className="playlist-button" onClick={this.runSpotifyMethods}>
          <i className="fa-solid fa-circle-play" />
        </button>
        <div id="playlist" className="container">
          {this.props.playlist.map((song) => {
            return <Song key={song.id} title={song.title} albumCover={song.albumCover} song={song.song} />;
          })}
        </div>
        <button type="button" id="reshuffle-playlist" className="playlist-button">
          <i className="fa-solid fa-arrows-rotate" />
        </button>
      </div>
    );
  }
}

export default PlayList;
