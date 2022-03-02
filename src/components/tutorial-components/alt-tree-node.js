/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';

class AltTreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      c: 'green',
      t: props.t,
      // parent: props.parent,
      // y: props.y,
      // song: props.song,
      // album: props.album,
    };
  }

  changeColor = () => {
    if (this.state.c === 'green') {
      this.setState({ c: 'blue' });
    } else if (this.state.c === 'blue') {
      this.setState({ c: 'orange' });
    } else if (this.state.c === 'orange') {
      this.setState({ c: 'yellow' });
    } else {
      this.setState({ c: 'green' });
    }
  };

  /*   changeColor = (c) => {
    this.setState({ a: c });
  };
  getStyle = () => {
    return `background:${this.state.a}`;
  };
 */
  render() {
    let inputStyle = {
      background: '#96A66D',
    };
    // change code below this line
    if (this.state.c === 'orange') {
      inputStyle = { background: '#EBA215' };
    } else if (this.state.c === 'blue') {
      inputStyle = { background: '#8DB0DA' };
    } else if (this.state.c === 'yellow') {
      inputStyle = { background: '#FFFA7F' };
    }
    // change code above this line
    return (
      <span className="dot" id={this.state.t} style={inputStyle} onClick={this.changeColor}>
        <img src={this.props.song.album_cover} draggable="false" alt="temp" className="round-img" onClick={this.props.runAlgo} />
      </span>
    );
  }
}
export default AltTreeNode;
