import React from 'react';

function Song(props) {
  const playSong = (props) => {
    // code to play the song here
  };

  if (props.song.album_cover) {
    return (
      <button type="button" className="song song-button" onClick={playSong}><img className="square-img" src={props.song.album_cover} alt="temp" /></button>
    );
  } // if it doesn't have a cover, render the title
  return (
    <button type="button" className="song song-button" onClick={playSong}><p>{props.name}</p></button>
  );
}

export default Song;
