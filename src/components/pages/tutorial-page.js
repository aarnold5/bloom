/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */

import React, { Component } from 'react';
import debounce from 'lodash.debounce';
// import update from 'react-addons-update';
import PlayList from '../tutorial-components/playlist';
import ToolBar from '../tutorial-components/tool-bar';
import TreeList from '../tutorial-components/tree-list';
import * as db from '../../services/firestore';
import SearchSuggestions from '../tutorial-components/search-suggestions';
import { bloomSearch } from '../tutorial-components/search';
import Tree from '../tutorial-components/tree';
// import Player from '../tutorial-components/player';

// const songLookup = {};

/* function treeToDict(t, dictSoFar) {
  if (t) {
    // eslint-disable-next-line no-param-reassign
    dictSoFar[t.root.name] = t.root.song;
    treeToDict(t.left, dictSoFar);
    treeToDict(t.right, dictSoFar);
  }
  return dictSoFar;
} */

/* let t = {
  root: {
    name: 'a',
    rec: false,
    visible: true,
    song: {
      name: 'AM Remix',
      id: '05bfbizlM5AX6Mf1RRyMho',
      album_cover: 'https://i.scdn.co/image/ab67616d00001e022ae66aa58208495074d88fd0',
      uri: 'spotify:track:05bfbizlM5AX6Mf1RRyMho',
    },
  },
  left: {
    root: {
      name: 'b',
      rec: false,
      visible: true,
      song: {
        name: 'A Sky Full of Stars',
        id: '0FDzzruyVECATHXKHFs9eJ',
        album_cover: 'https://i.scdn.co/image/ab67616d00001e02f864bcdcc245f06831d17ae0',
        uri: 'spotify:track:0FDzzruyVECATHXKHFs9eJ',
      },
    },
    left: {
      root: {
        name: 'd',
        rec: true,
        visible: true,
        song: {
          name: 'Anyone',
          id: '2WnAKZefdRHxtBEkRjFOHC',
          album_cover: 'https://i.scdn.co/image/ab67616d00001e02e6f407c7f3a0ec98845e4431',
          uri: 'spotify:track:2WnAKZefdRHxtBEkRjFOHC',
        },
      },
      left: null,
      right: null,
    },
    right: {
      root: {
        name: 'e',
        rec: true,
        visible: true,
        song: {
          name: 'All Girls Are The Same',
          id: '4VXIryQMWpIdGgYR4TrjT1',
          album_cover: 'https://i.scdn.co/image/ab67616d00001e02f7db43292a6a99b21b51d5b4',
          uri: 'spotify:track:4VXIryQMWpIdGgYR4TrjT1',
        },
      },
      left: null,
      right: null,
    },
  },
  right: {
    root: {
      name: 'c',
      rec: false,
      visible: true,
      song: {
        name: 'A Tu Merced',
        id: '4r9jkMEnArtWGH2rL2FZl0',
        album_cover: 'https://i.scdn.co/image/ab67616d00001e02548f7ec52da7313de0c5e4a0',
        uri: 'spotify:track:4r9jkMEnArtWGH2rL2FZl0',
      },
    },
    left: {
      root: {
        name: 'f',
        rec: true,
        visible: true,
        song: {
          name: 'All Too Well (10 Minute Version) (Taylor\'s Version) (From The Vault)',
          id: '5enxwA8aAbwZbf5qCHORXi',
          album_cover: 'https://i.scdn.co/image/ab67616d00001e02318443aab3531a0558e79a4d',
          uri: 'spotify:track:5enxwA8aAbwZbf5qCHORXi',
        },
      },
      left: null,
      right: null,
    },
    right: {
      root: {
        name: 'g',
        rec: true,
        visible: false,
        song: {
          name: 'Armed And Dangerous',
          id: '5wujBwqG7INdStqGd4tRMX',
          album_cover: 'https://i.scdn.co/image/ab67616d00001e02f7db43292a6a99b21b51d5b4',
          uri: 'spotify:track:5wujBwqG7INdStqGd4tRMX',
        },
      },
      left: null,
      right: null,
    },
  },
}; */

class TutorialPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trees: [],
      playlist: [],
      searchSuggestions: [],
      searching: false,
      // allowRootAdd: true,
      issueRootWarning: false,
      isLoading: false,
      renderDefault: true,
      fillingNodeID: -1,
      isPlayMode: true,
      isDragMode: false,
      isplayingTrack: false,
      currentTrack: '',
      tool_mode: 'select',
      currentTrackUri: '',
      // eslint-disable-next-line max-len
      accessToken: 'BQCWYvlgHaGGLI8BDD-CCgcQrQmulElAAwV-BFLoaKjxZ_SyVO2HLfXz9p_FYpIb0MqGEPP9Y95cNEpa7QebQqxAHW0JxoIq3kWNT2gEEnr-02jGE-54u4cMt4gcly3SqN2FRH8wJmqZREo3qs-IZMJXTlx-ak1mX5Mo6f87GbJ5s0AWJqfEaaAwR8KbH6KPqz5-6NbkI8_1hrYJRrnLQlxp_8MW0FUS8OwwBwP9P2oZKvKNU3AzUJvjAAB8B2KWfEGBn2UvJ_hZuWvcORiigPYAmHc_oNL5jfUQp0uwSTMKDMqB_j5c-CCgcQrQmulElAAwV-BFLoaKjxZ_SyVO2HLfXz9p_FYpIb0MqGEPP9Y95cNEpa7QebQqxAHW0JxoIq3kWNT2gEEnr-02jGE-54u4cMt4gcly3SqN2FRH8wJmqZREo3qs-IZMJXTlx-ak1mX5Mo6f87GbJ5s0AWJqfEaaAwR8KbH6KPqz5-6NbkI8_1hrYJRrnLQlxp_8MW0FUS8OwwBwP9P2oZKvKNU3AzUJvjAAB8B2KWfEGBn2UvJ_hZuWvcORiigPYAmHc_oNL5jfUQp0uwSTMKDMqB_j5c-trA6nGrG8sPEVCowKYB0w6ZuoDq2UPiSIzpfL1I6LcaPPCA7XdrVwmbuQVkW4K8PxBSG8dQ2x_b-tcTEszXnZ1wNARQAG9Qqg4toqDYGYi65tq-mgbty45',
      tree: null,
      // trackUri: 'spotify:track:05bfbizlM5AX6Mf1RRyMho',
    };

    this.search = debounce(this.search, 300);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keydownHandler);
    db.fetchTrees()
      .then((result) => {
        this.setState({ trees: result.trees });
        db.loadTree(result.trees[0].id)
          .then((res) => {
            console.log(res);
            this.setState({ tree: res.tree_json });
          });
      });
    // eslint-disable-next-line no-new-object
  }

  componentWillUnmount() {
    this.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = (event) => {
    if (event.key === 'w') {
      this.setState({ tool_mode: 'weight' });
    } else if (event.key === 's') {
      this.setState({ tool_mode: 'select' });
    } else if (event.key === 'c') {
      this.setState({ tool_mode: 'cut' });
    } else if (event.key === 'p') {
      this.setState({ tool_mode: 'play' });
    } else if (event.key === '+') {
      this.setState({ tool_mode: 'plus' });
    } else if (event.key === '-') {
      this.setState({ tool_mode: 'minus' });
    }
  };

  setPlus = () => {
    this.setState({ tool_mode: 'plus' });
  };

  setMinus = () => {
    this.setState({ tool_mode: 'minus' });
  };

  setCut = () => {
    this.setState({ tool_mode: 'cut' });
  };

  setSel = () => {
    this.setState({ tool_mode: 'select' });
  };

  setWeight = () => {
    this.setState({ tool_mode: 'weight' });
  };

  setPlay = () => {
    this.setState({ tool_mode: 'play' });
  };

  search = (text) => {
    bloomSearch(text).then((searchSuggestions) => {
      this.setState({
        searchSuggestions,
      });
    });
  };

  handleAddRootNode = () => {
    db.createTree()
      .then((result) => {
        console.log(result.tree_json);
        // this.setState({ tree: result.tree_json });
        db.fetchTrees()
          .then((res) => {
            this.setState({ trees: res.trees });
            this.setState({ searching: true });
          });
      });
  };

  handleSelectSong = (song) => {
    this.addNode(song);
    this.setState({ searching: false });
    this.setState((prevState) => ({ currid: prevState.currid + 1 }));
    db.popPlaylist(song);
  };

  // DRAFT FOR LATER USE
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
    console.log(tree.target.id);
    db.loadTree(tree.target.id)
      .then((result) => {
        console.log(result);
        this.setState({ tree: result.tree_json });
      });
  };

  handleGetRecs = () => {
    this.setState({ isLoading: true });
    db.getRecs()
      .then((songIDs) => {
        // eslint-disable-next-line array-callback-return
        // eslint-disable-next-line no-unused-vars
        db.songIDsToSongs(songIDs.songs)
          .then((res) => {
            this.setState({ playlist: res.songs });
            this.setLoadingFalse();
          });
      });
  };

  // eslint-disable-next-line class-methods-use-this
  /*  setSongPlayback = (nodeName) => {
    console.log('click');
    console.log(`node: ${nodeName} has been clicked!`);
    if (this.state.isPlayMode) {
      const songUri = songLookup[nodeName].uri;
      this.setState({ trackUri: songUri });
    } else {
      console.log('showNodes');
    }
  }; */

  // eslint-disable-next-line class-methods-use-this
  handleDeleteNodes = (e) => {
    console.log(e.target.id);
    db.deleteNodes(this.state.tree, this.state.tree.id, e.target.id)
      .then((result) => {
        console.log(result);
        this.setState({ tree: result.tree_json });
      });
  };

  handleShowChildren = (e) => {
    console.log(e.target.id);
    db.showChildren(this.state.tree, e.target.id)
      .then((result) => {
        console.log(result);
        this.setState({ tree: result.tree_json });
      });
  };

  setLoadingFalse = () => {
    this.setState({ isLoading: false });
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
          <ToolBar addRootNode={this.handleAddRootNode}
            tool={this.state.tool_mode}
            setPlus={this.setPlus}
            setCut={this.setCut}
            setSel={this.setSel}
            setW={this.setWeight}
            setPlay={this.setPlay}
            setMinus={this.setMinus}
          />
          {this.renderRootWarning()}
          <SearchSuggestions
            searching={this.state.searching}
            onSelectSong={this.handleSelectSong}
            onSearchChange={this.search}
            searchSuggestions={this.state.searchSuggestions}
          />
          <div id="panzoom-element-wrapper">
            <div id="panzoom-element">
            <Tree
              currid={this.state.currid}
              tree={this.state.tree}
              runAlgo={this.handleRunAlgo}
              isPlayMode={this.state.isPlayMode}
              onClickNode={this.handleClickNode}
              tool={this.state.tool_mode}
              deleteNodes={() => this.handleDeleteNodes}
              onShowChildren={() => this.handleShowChildren} />
            </div>
          </div>
          {/* <Player accessToken={this.state.accessToken} trackUri={this.state.trackUri} playingTrack /> */}
          <PlayList playlist={this.state.playlist} getRecs={this.handleGetRecs} isLoading={this.state.isLoading} />
        </div>
      </div>
    );
  }
}

export default TutorialPage;
