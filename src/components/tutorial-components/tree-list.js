/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import TreeListComponent from './tree-list-component';

class TreeList extends Component {
  render() {
    return (
      <div id="tree-list" className="vertical-container container">
        <TreeListComponent />
        <TreeListComponent />
        <TreeListComponent />
        <TreeListComponent />
        <TreeListComponent />
      </div>
    );
  }
}

export default TreeList;
