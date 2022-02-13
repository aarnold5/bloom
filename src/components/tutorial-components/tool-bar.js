/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class ToolBar extends Component {
  render() {
    return (
      <div id="tool-bar" className="container">
        <button type="button">icon</button>
        <button type="button">icon</button>
        <button type="button">icon</button>
        <button type="button">icon</button>
        <button type="button">icon</button>
        <button type="button">icon</button>
      </div>
    );
  }
}

export default ToolBar;
