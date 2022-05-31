import React, { Component } from 'react/cjs/react.production.min';

class Modem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props);
    const inputStyle = {
      background: 'gray',
      width: '150px',
      height: '200px',
      position: 'absolute',
      top: '55px',
      borderRadius: '4px',
      padding: '8px',
    };
    return (
      <div id="modem" style={inputStyle}>
        name:{this.props.song.name} <br />
        artist:  <br />
        set attribute:
        <div id="modemButtons">
          <button type="button"> tempo </button>
          <button type="button"> mood </button>
          <button type="button"> key </button>
          <button type="button"> dancebility </button>
        </div>
      </div>
    );
  }
}
export default Modem;
