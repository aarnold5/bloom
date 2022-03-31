/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import update from 'react-addons-update';
import PlayList from '../tutorial-components/playlist';
import ToolBar from '../tutorial-components/tool-bar';
import TreeList from '../tutorial-components/tree-list';
import * as db from '../../services/firestore';
import SearchSuggestions from '../tutorial-components/search-suggestions';
import { bloomSearch } from '../tutorial-components/search';
import AltTree from '../tutorial-components/alt-tree';
// import AltDefaultTree from '../tutorial-components/alt-default-tree';

class TutorialPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trees: [],
      playlist: [],
      searchSuggestions: [],
      layers: [],
      currid: 0,
      searching: false,
      allowRootAdd: true,
      issueRootWarning: false,
      isLoading: false,
      renderDefault: true,
      fillingNodeID: -1,
      ll: 0,
      multi: 1,
    };

    this.search = debounce(this.search, 300);
  }

  componentDidMount() {
    db.fetchTrees()
      .then((result) => this.setState({ trees: result.trees }));
    /* db.fetchPlaylist()
      .then((result) => this.setState({ playlist: result.playlist })); */
  }

  /* handleFillNode = (id) => {
    this.setState({ searching: true });
    this.setState({ fillingNodeID: id });
  }; */

  search = (text) => {
    bloomSearch(text).then((searchSuggestions) => {
      this.setState({
        searchSuggestions,
      });
    });
  };

  rootNode = () => {
    if (this.state.allowRootAdd) {
      this.setState({ searching: true });
      /* this.setState({
        layers: [
          [{
            song: {
              id: '',
              album_cover: 'https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg',
              name: '',
            },
          }],
          [{
            song: {
              id: '',
              album_cover: 'https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg',
              name: '',
            },
          }, {
            song: {
              id: '',
              album_cover: 'https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg',
              name: '',
            },
          }],
        ],
      }); */
    } else {
      this.setState({ issueRootWarning: true });
    }
  };

  addNode = (song) => {
    if (this.state.layers.length === 0) {
      this.setState({
        layers: [[{ song }]],
      });
      console.log('first');
    } else if (this.state.layers[this.state.ll].length >= this.state.multi) {
      this.setState((prevState) => ({
        layers: [...prevState.layers, [{ song }]],
        ll: prevState.ll + 1,
        multi: prevState.multi * 2,
      }));
    } else {
      this.setState(update(this.state, {
        layers: {
          [this.state.ll]: {
            $set: [...this.state.layers[this.state.ll], { song }],
          },
        },
      }));
    }
    this.setState((prevState) => ({ currid: prevState.currid + 1 }));
  };

  handleSelectSong = (song) => {
    /* this.setState((prevState) => ({
      layers: [...prevState.layers, { song }],
    })); */
    this.addNode(song);
    this.setState({ searching: false });
    this.setState((prevState) => ({ currid: prevState.currid + 1 }));
    db.popPlaylist(song);
  };

  // eslint-disable-next-line class-methods-use-this
  // version draft for later use
  /* handleRunAlgo = () => {
    db.getRecs()
      .then((songIDsList) => { console.log(songIDsList[0]); });
    // db.saveTree();
    const tempSong = {
      name: 'Moonlight', id: '0JP9xo3adEtGSdUEISiszL', album_cover: 'https[]://i.scdn.co/image/ab67616d00001e02806c160566580d6335d1f16c',
    };
    this.setState((prevState) => ({
      layers: [...prevState.layers, [{ song: tempSong }, { song: tempSong }]],
    }));
  }; */

  handleLoadNewTree = (tree) => {
    this.setState({ currTree: this.loadTree(tree.id) });
    this.setState({ layers: this.loadTree(tree.id).layers });
  };

  // eslint-disable-next-line class-methods-use-this
  handleGetRecs = () => {
    this.setState({ isLoading: true });
    db.getRecs()
      .then((result) => {
        console.log(result);
        db.songIDsToSongs(result.songs)
          .then((songs) => {
            console.log(songs);
            this.setState({ isLoading: false });
            this.setState({ playlist: songs.songs });
            // songs.songs.map((song) => db.addToOutputPlaylist(song));
          });
      });
  };

  // eslint-disable-next-line consistent-return
  renderRootWarning() {
    if (this.state.issueRootWarning) {
      return <p>sorry! you can only add one root node</p>;
    }
  }

  render() {
    return (
      <div id="tutorial-page" className="page-container container">
        <TreeList trees={this.state.trees} onSelectDifferentTree={() => this.handleLoadNewTree} />
        <div className="right-half container">
          <ToolBar addRootNode={this.rootNode} />
          {this.renderRootWarning()}
          <SearchSuggestions
            searching={this.state.searching}
            onSelectSong={this.handleSelectSong}
            onSearchChange={this.search}
            searchSuggestions={this.state.searchSuggestions}
          />
          {/* <AltDefaultTree fillNode={this.handleFillNode} layers={this.state.layers} /> */}
          <AltTree currid={this.state.currid} layers={this.state.layers} runAlgo={this.handleRunAlgo} />
          <PlayList playlist={this.state.playlist} getRecs={this.handleGetRecs} isLoading={this.state.isLoading} />
        </div>
      </div>
    );
  }
}

export default TutorialPage;
