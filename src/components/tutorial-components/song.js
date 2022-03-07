import React from 'react';

function Song(props) {
  // eslint-disable-next-line no-shadow
  const playSong = (props) => {
    // code to play the song here
  };
  console.log(props.song);
  console.log(props.song.name);
  console.log(props.name);
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
