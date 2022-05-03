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
import Player from '../tutorial-components/player';

const t = {
  root: {
    name: 'a',
    rec: false,
    visible: true,
    song: {
      name: 'AM Remix',
      id: '05bfbizlM5AX6Mf1RRyMho',
      album_cover: 'https://i.scdn.co/image/ab67616d00001e022ae66aa58208495074d88fd0',
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
        },
      },
      left: null,
      right: null,
    },
  },
};

class TutorialPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trees: [],
      playlist: [],
      searchSuggestions: [],
      searching: false,
      allowRootAdd: true,
      issueRootWarning: false,
      isLoading: false,
      renderDefault: true,
      fillingNodeID: -1,
      tree: t,
      isPlayMode: true,
      isplayingTrack: false,
      currentTrack: '',
      // eslint-disable-next-line max-len
      accessToken: 'BQCdCdKrpNfclw0olKmv6AWH31HQjrEo16EvigndnETXnoyHzpctEckTRmTYj7XHp8Jjf_g3L9XE0pUk-Mnq6r9zsHplqO3MeqG4HZrMvGrOMni-m40UsfMLr0S84KvrflIqOCrhJlvd7QvM-x6TzdVqAggzrzlqXoXAZvDzIcVJpcn_yhf4fLHVZu-BbagBfibD9wlQh5NiZKbxnJZ9olj7Bvh9w_SxUcdyedOVmFTAsDT3JFNYc_w-8BLPJgbxDJ66crcV_nZjFcCYdXOwtT8w0blIQfeAOIrAcQGsScvZzap3tJY8',
      trackUri: 'spotify:track:05bfbizlM5AX6Mf1RRyMho',
    };

    this.search = debounce(this.search, 300);
  }

  componentDidMount() {
    db.fetchTrees()
      .then((result) => this.setState({ trees: result.trees }));
  }

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
    } else {
      this.setState({ issueRootWarning: true });
    }
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
    console.log(tree);
    console.log(tree.target.id);
    db.loadTree(tree.target.id)
      .then((result) => {
        this.setState({ tree: result });
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
  handleClickNode = (song) => {
    console.log('click');
    if (this.state.isPlayMode) {
      console.log(`playSong:${song.name}`);
      console.log(`playSong:${song.id}`);
    //   this.setState({ trackUri: `spotify:track:${song.id}` });
    // } else {
    //   console.log('showNodes');
    }
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
          <ToolBar addRootNode={this.rootNode} />
          {this.renderRootWarning()}
          <SearchSuggestions
            searching={this.state.searching}
            onSelectSong={this.handleSelectSong}
            onSearchChange={this.search}
            searchSuggestions={this.state.searchSuggestions}
          />
          {`Tree: ${this.state.tree}`}
          <Tree currid={this.state.currid} tree={t} runAlgo={this.handleRunAlgo} isPlayMode={this.state.isPlayMode} onClickNode={this.handleClickNode} />
          <Player accessToken={this.state.accessToken} trackUri={this.state.trackUri} playingTrack />
          <PlayList playlist={this.state.playlist} getRecs={this.handleGetRecs} isLoading={this.state.isLoading} />
        </div>
      </div>
    );
  }
}

export default TutorialPage;
