/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PlayList from '../tutorial-components/playlist';
import ToolBar from '../tutorial-components/tool-bar';
import TreeList from '../tutorial-components/tree-list';
import Tree from '../tutorial-components/tree';

class TutorialPage extends Component {
  render() {
    return (
      <div id="tutorial-page" className="page-container container">
        <TreeList />
        <div className="right-half container">
          <ToolBar />
          <div id="tree-space" className="container">
            <Tree />
          </div>
          <PlayList />
        </div>
      </div>
    );
  }
}

export default TutorialPage;
