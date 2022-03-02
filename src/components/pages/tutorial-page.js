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

class TutorialPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trees: [],
      playlist: [],
      searchSuggestions: [],
      selectedSuggestion: null,
      currTree: { layers: [] },
      // eslint-disable-next-line react/no-unused-state
      nothingYet: true,
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
    this.setState({ selectedSuggestion: song });
  };

  render() {
    return (
      <div id="tutorial-page" className="page-container container">
        <TreeList trees={this.state.trees} />
        <div className="right-half container">
          <ToolBar addRootNode={this.rootNode} />
          <div id="tree-space" className="container">
            <Tree />
            <SearchSuggestions onSelectSong={this.handleSelectSong} onSearchChange={this.search} searchSuggestions={this.state.searchSuggestions} />
            {this.state.selectedSuggestion}
            {console.log(this.state.currTree)}
          </div>
          <PlayList playlist={this.state.playlist} />
        </div>
      </div>
    );
  }
}

export default TutorialPage;
