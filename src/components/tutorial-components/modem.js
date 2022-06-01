import React, { Component } from 'react/cjs/react.production.min';

class Modem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const inputStyle = {
      background: 'gray',
      width: '150px',
      height: '200px',
      position: 'absolute',
      top: '55px',
      borderRadius: '4px',
      padding: '8px',
      zIndex: '6',
    };
    return (
      <div id="modem" style={inputStyle}>
        name:{this.props.song.name} <br />
        artist:  <br />
        set attribute:
        <div id="modemButtons">
          <button id="tempo" type="button" onClick={this.props.clickfunc3} className="mbuttons" style={{ zIndex: '8' }}> tempo </button>
          <button type="button" className="mbuttons"> mood </button>
          <button type="button" className="mbuttons"> key </button>
          <button type="button" className="mbuttons"> dancebility </button>
        </div>
      </div>
    );
  }
}
export default Modem;
