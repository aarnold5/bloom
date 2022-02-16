/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class ToolBar extends Component {
  render() {
    return (
      <div id="tool-bar" className="container">
        <button type="button" className="toolbar-button">
          <i className="fa-solid fa-minus" />
        </button>
        <button type="button" className="toolbar-button">
          <i className="fa-solid fa-plus" />
        </button>
        <button type="button" className="toolbar-button">
          <i className="fa-solid fa-seedling" />
        </button>
        <button type="button" className="toolbar-button">
          <i className="fa-solid fa-scissors" />
        </button>
        <button type="button" className="toolbar-button">
          <i className="fa-solid fa-dumbbell" />
        </button>
        <button type="button" className="toolbar-button">
          <i className="fa-solid fa-arrow-pointer" />
        </button>
      </div>
    );
  }
}

export default ToolBar;
