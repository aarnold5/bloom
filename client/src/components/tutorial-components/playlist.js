/* eslint-disable class-methods-use-this */
/* eslint-disable new-cap */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Song from './song';
import * as spt from '../../spotifyTesting';

class PlayList extends Component {
  constructor(props) {
    super(props);
    this.state = { }; // nothing here yet
  }

  runSpotifyMethods = () => {
    const spotifyApi = spt.CreateSpotifyObjects();
    // eslint-disable-next-line no-unused-vars
    const songIDs = this.props.playlist.map((song) => {
      console.log(song);
      return song.id;
    });
    /* spt.createPlaylist(spotifyApi, 'New Thing').then((playlistID) => {
      spt.addTracksToPlaylist(spotifyApi, playlistID, songIDs);
    }); */
    /* spt.addTracksToPlaylist(spotifyApi, '1TADXYivcy5xhbudsafzsW', songIDs); */
    spt.createPlaylist(spotifyApi, 'New Thing');
    spt.addTracksToPlaylist(spotifyApi, '54KCx9JxYhl80t0XSyCA2F', ['7EuTFqQnMZoIaGisMRCtf6', '1wAPbQ5XjbZqPl0WDl5mHH', '0u3obb9aO2piYJMfa82XRd']);
    /*  spt.CreateSpotifyObjects()
      .then((spotifyApi) => {
        spt.createPlaylist(spotifyApi, 'New Thing')
          .then((playlistID) => {
            spt.addTracksToPlaylist(spotifyApi, playlistID, songIDs);
          });
      }); */
  };

  // eslint-disable-next-line consistent-return
  renderLoading() {
    if (this.props.isLoading) {
      return <p>Loading Recommendations...</p>;
    }
  }

  render() {
    return (
      <div id="playlist-container" className="container">
        <button type="button" id="play-playlist" className="playlist-button" onClick={this.runSpotifyMethods}>
          <i className="fa-solid fa-circle-play" />
        </button>
        <div id="playlist" className="container">
          {this.renderLoading()}
          {console.log(this.props.playlist)}
          {this.props.playlist.map((song) => {
            console.log(song);
            return <Song key={song.id} name={song.name} song={song} />;
          })}
        </div>
        <button type="button" id="reshuffle-playlist" className="playlist-button" onClick={this.props.getRecs}>
          <i className="fa-solid fa-arrows-rotate" />
        </button>
      </div>
    );
  }
}

export default PlayList;