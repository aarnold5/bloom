import React from 'react';

function Song(props) {
  // eslint-disable-next-line no-shadow
  const playSong = (props) => {
    // code to play the song here
  };

  return (
    <button type="button" className="song song-button"><img className="square-img" src={props.albumCover} alt="temp" onClick={playSong} /></button>
  );
}

export default Song;
