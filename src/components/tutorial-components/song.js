import React from 'react';
import pic2 from '../../loads.png';

function Song(props) {
  const playSong = () => {
    // code to play the song here
  };

  if (props.song.album_cover) {
    return (
      <button type="button" className="song song-button" onClick={playSong}><img className="square-img" src={props.album_cover} alt="temp" /></button>
    );
  } // if it doesn't have a cover, render the title
  return (
    null
  );
}

export default Song;
