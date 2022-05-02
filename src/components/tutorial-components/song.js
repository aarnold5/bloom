import React from 'react';

function Song(props) {
  const playSong = () => {
    // code to play the song here
  };
  console.log(props.album_cover);
  console.log(props.name);

  if (props.song.album_cover) {
    return (
      <button type="button" className="song song-button" onClick={playSong}><img className="square-img" src={props.album_cover} alt="temp" /></button>
    );
  } // if it doesn't have a cover, render the title
  return (
    <button type="button" className="song song-button" onClick={playSong}><p>{props.name}</p></button>
  );
}

export default Song;
