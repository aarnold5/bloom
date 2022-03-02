/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import PlayList from '../tutorial-components/playlist';
import ToolBar from '../tutorial-components/tool-bar';
import TreeList from '../tutorial-components/tree-list';
import Tree from '../tutorial-components/tree';
import * as db from '../../services/firestore';
import SearchSuggestions from '../tutorial-components/search-suggestions';
import { bloomSearch } from '../tutorial-components/search';
import AltTree from '../tutorial-components/alt-tree';

class TutorialPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trees: [],
      playlist: [],
      searchSuggestions: [],
      // selectedSuggestion: null,
      layers: [],
      // eslint-disable-next-line react/no-unused-state
      searching: true,
    };

    this.search = debounce(this.search, 300);
  }

  componentDidMount() {
    db.fetchTrees()
      .then((result) => this.setState({ trees: result.trees }));
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

  rootNode = () => {
    // do something to add node
  };

  handleSelectSong = (song) => {
    // const s = song;
    // this.setState({ selectedSuggestion: song });
    this.setState((prevState) => ({
      layers: [...prevState.layers, { song }],
    }));
    this.setState({ searching: false });
  };

  render() {
    return (
      <div id="tutorial-page" className="page-container container">
        <TreeList trees={this.state.trees} />
        <div className="right-half container">
          <ToolBar addRootNode={this.rootNode} />
          <div id="tree-space" className="container">
            <Tree />
            <AltTree layers={this.state.layers} />
            <SearchSuggestions searching={this.state.searching} onSelectSong={this.handleSelectSong} onSearchChange={this.search} searchSuggestions={this.state.searchSuggestions} />
          </div>
          <PlayList playlist={this.state.playlist} />
        </div>
      </div>
    );
  }
}

export default TutorialPage;
