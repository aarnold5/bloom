import React, { Component } from 'react';
import { Map as iMap } from 'immutable';
import PlayList from '../tutorial-components/playlist';
import ToolBar from '../tutorial-components/tool-bar';
import TreeList from '../tutorial-components/tree-list';
import Tree from '../tutorial-components/tree';
import SearchBar from '../tutorial-components/search-bar';

class TutorialPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trees: iMap({
        0: {
          title: 'Tree 1',
          nodes: {
          },
        },
        1: {
          title: 'Tree 2',
          nodes: {
          },
        },
        2: {
          title: 'Tree 3',
          nodes: {
          },
        },
        3: {
          title: 'Tree 4',
          nodes: {
          },
        },
      }),
    };
  }

  render() {
    return (
      <div id="tutorial-page" className="page-container container">
        <TreeList trees={this.state.trees} />
        <div className="right-half container">
          <ToolBar />
          <div id="tree-space" className="container">
            <Tree />
            <SearchBar />
          </div>
          <PlayList />
        </div>
      </div>
    );
  }
}

export default TutorialPage;
