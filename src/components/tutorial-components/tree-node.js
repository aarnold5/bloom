import React from 'react';

class TreeNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 'green',
      // x: props.x,
      // y: props.y,
      // song: props.song,
      // album: props.album,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { a: props.a, x: props.x, y: props.y };
  }

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
    if (this.state.a === 'orange') {
      inputStyle = { background: '#EBA215' };
    } else if (this.state.a === 'blue') {
      inputStyle = { background: '#8DB0DA' };
    }
    // change code above this line
    return (
      <div id="tree-space">
        <span className="dot" style={inputStyle}><img src="../favicon.png" draggable="false" alt="temp" className="round-img" /></span>
      </div>
    );
  }
}

export default TreeNode;
