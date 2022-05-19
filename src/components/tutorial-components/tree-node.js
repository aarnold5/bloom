/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Draggable from 'react-draggable';
import { useXarrow } from 'react-xarrows';

class TreeNode2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namey: this.props.id,
    };
  }

  /* function playSong(song) {
    console.log(`playSong:${song.name}`);
  } */
  render() {
    const updateXarrow = useXarrow();
    return (
      <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
        <div>
          <button type="button"
            id={this.props.id}
            className="dot node-button"
            onClick={() => this.props.onclickfunc(this.props.id)}
          >
            <img src={this.props.song.album_cover} id={this.props.song.id} draggable="false" alt="temp" className="round-img" />
          </button>
        </div>
      </Draggable>
    );
  }
}
export default TreeNode2;
