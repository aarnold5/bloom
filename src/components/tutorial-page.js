/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import TreeNode from './tree-node';

class TutorialPage extends Component {
  render() {
    return (
      <div id="tutorial-main-container" className="container">
        <div id="list-of-your-trees" className="container" />
        <div className="right-half container">
          <div id="tool-bar" className="container" />
          <div id="tree-space" className="container">
            <TreeNode />
          </div>
          <div id="rec-bar" className="container" />
        </div>
      </div>
    );
  }
}

export default TutorialPage;
