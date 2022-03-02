/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Map as iMap } from 'immutable';
import debounce from 'lodash.debounce';
import PlayList from '../tutorial-components/playlist';
import ToolBar from '../tutorial-components/tool-bar';
import TreeList from '../tutorial-components/tree-list';
import Tree from '../tutorial-components/tree';
// import SearchBar from '../tutorial-components/search-bar';
import * as db from '../../services/firestore';
import SearchSuggestions from '../tutorial-components/search-suggestions';
import { bloomSearch } from '../tutorial-components/search';

class TutorialPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trees: [],
      playlist: [],
      searchSuggestions: [],
      /* playlist: iMap({
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
      }), */

      currTree: {
        title: 'Tree 1',
        addRoot: false,
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

    this.search = debounce(this.search, 300);
  }

  /* componentDidMount() {
    db.fetchTrees((trees) => {})
      .then((response) => {
        console.log(response);
      });
    // this.setState({ trees: iMap(trees.trees) });
  } */

  /* componentDidMount() {
    db.printTrees((trees) => {
      console.log(trees);
      // this.setState({ trees: iMap(trees.trees) });
    });
  } */

  componentDidMount() {
    db.fetchTrees()
      .then((result) => this.setState({ trees: result.trees }));
    // this.setState({ trees: iMap(trees.trees) });
    db.fetchPlaylist()
      .then((result) => this.setState({ playlist: result.playlist }));
  }

  search = (text) => {
    bloomSearch(text).then((searchSuggestions) => {
      this.setState({
        searchSuggestions,
        // selectedSuggestion: searchSuggestions[0],
      });
    });
  };

  rootNode() {
    console.log('jhoierh');
  }

  render() {
    return (
      <div id="tutorial-page" className="page-container container">
        <TreeList trees={this.state.trees} />
        <div className="right-half container">
          <ToolBar addRootNode={this.rootNode} />
          <div id="tree-space" className="container">
            <Tree currTree={this.state.currTree} />
            <SearchSuggestions onSearchChange={this.search} searchSuggestions={this.state.searchSuggestions} />
          </div>
          <PlayList playlist={this.state.playlist} />
        </div>
      </div>
    );
  }
}

export default TutorialPage;
