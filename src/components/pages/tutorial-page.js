/* eslint-disable max-len */
import React, { Component } from 'react';
import { Map as iMap } from 'immutable';
import PlayList from '../tutorial-components/playlist';
import ToolBar from '../tutorial-components/tool-bar';
import TreeList from '../tutorial-components/tree-list';
import Tree from '../tutorial-components/tree';
import SearchBar from '../tutorial-components/search-bar';
import { fetchTrees } from '../../services/firestore';

class TutorialPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trees: iMap({
        0: {
          title: 'Tree 1',
          layers: [],
        },
        1: {
          title: 'Tree 2',
          layers: [],
        },
        2: {
          title: 'Tree 3',
          layers: [],
        },
        3: {
          title: 'Tree 4',
          layers: [],
        },
      }),

      playlist: iMap({
        song1: {
          title: '',
          albumCover: 'https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg',
          thingToPassToFunctionToPlayTheSong: '',
        },
        song2: {
          title: '',
          albumCover: 'https://i.mdel.net/i/db/2019/12/1255378/1255378-800w.jpg',
          thingToPassToFunctionToPlayTheSong: '',
        },
        song3: {
          title: '',
          albumCover: 'https://media2.wnyc.org/i/620/620/l/80/1/dark_side_moonLARGE.jpg',
          thingToPassToFunctionToPlayTheSong: '',
        },
        song4: {
          title: '',
          albumCover: 'https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg',
          thingToPassToFunctionToPlayTheSong: '',
        },
        song5: {
          title: '',
          albumCover: 'https://i.mdel.net/i/db/2019/12/1255378/1255378-800w.jpg',
          thingToPassToFunctionToPlayTheSong: '',
        },
        song6: {
          title: '',
          albumCover: 'https://media2.wnyc.org/i/620/620/l/80/1/dark_side_moonLARGE.jpg',
          thingToPassToFunctionToPlayTheSong: '',
        },
        song7: {
          title: '',
          albumCover: 'https://i.mdel.net/i/db/2019/12/1255378/1255378-800w.jpg',
          thingToPassToFunctionToPlayTheSong: '',
        },
        song8: {
          title: '',
          albumCover: 'https://media2.wnyc.org/i/620/620/l/80/1/dark_side_moonLARGE.jpg',
          thingToPassToFunctionToPlayTheSong: '',
        },
      }),

      currTree: {
        title: 'Tree 1',
        totalLayers: 2,
        nodes: iMap({
          node1: {
            a: 'green',
            songTitle: '',
            song: '',
            albumCover: '',
          },
          node2: {
            a: 'green',
            songTitle: '',
            song: '',
            albumCover: '',
          },
          node3: {
            a: 'green',
            songTitle: '',
            song: '',
            albumCover: '',
          },
          node4: {
            a: 'green',
            songTitle: '',
            song: '',
            albumCover: '',
          },
          node5: {
            a: 'green',
            songTitle: '',
            song: '',
            albumCover: '',
          },
        }),
      },
    };
  }

  componentDidMount() {
    fetchTrees((trees) => {
      this.setState({ trees: trees.trees });
    });
  }
  render() {
    return (
      <div id="tutorial-page" className="page-container container">
        <TreeList trees={this.state.trees} />
        <div className="right-half container">
          <ToolBar />
          <div id="tree-space" className="container">
            <Tree currTree={this.state.currTree} />
            <SearchBar />
          </div>
          <PlayList playlist={this.state.playlist} />
        </div>
      </div>
    );
  }
}

export default TutorialPage;
