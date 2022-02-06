/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import TreeNode from './tree-node';

class TutorialPage extends Component {
  render() {
    return (
      <div id="tutorial-main-container">
        <div id="list-of-your-trees" />
        <div className="right-half">
          <div id="tool-bar" />
          <div id="tree-space">
            <TreeNode />
          </div>
          <div id="rec-bar" />
        </div>
      </div>
    );
  }
}

export default TutorialPage;
