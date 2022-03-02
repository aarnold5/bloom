import React from 'react';

function Suggestion(props) {
  return (
    <button type="button"
      className="searchSuggestion"
      /* onClick={() => {
        props.onSelectSong(props.id);
        console.log(props.id);
      }} */
      onClick={props.onClick}
    >
      <img alt={props.name} src={props.albumCover} className="tiny-img" />
      <p>{props.name}</p>
    </button>
  );
}

export default Suggestion;
