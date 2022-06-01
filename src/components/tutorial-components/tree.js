/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable class-methods-use-this */
import React from 'react';
import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';
import Draggable from 'react-draggable';
import Panzoom from '@panzoom/panzoom';
import pic from '../../plus.png';
import pic3 from '../../loads.png';
// import pic3 from '../../seeRecs.png';
import * as db from '../../services/firestore';

function TreeNode2(props) {
  const updateXarrow = useXarrow();

  /* function playSong(song) {
    console.log(`playSong:${song.name}`);
  } */
  let inputStyle = {
    background: '#96A66D',
  };
  const colordict = {
    tempo: '#D54800', liveness: '#FFFA7F', energy: '#EBA215', instrumentalness: '#D2E7C8', happiness: '#81DEDE', acousticness: '#808082', danceability: '#9C8DDA', mode: '#93A57E', key: '#E5E5E5', pop: '#DAAD8D',
  };
  // const str = 'tempo,liveness,energy,happiness,instrumentalness,acousticness,mode';
  const str = props.root.attr;
  const lists = str.split(',');
  const colors = lists.map((c) => colordict[c]);
  if (colors.length === 1) {
    inputStyle = { background: `${colors[0]}` };
  } else if (colors.length === 2) {
    inputStyle = {
      background: `conic-gradient(${colors[0]} 0deg 90deg, ${colors[1]} 90deg 270deg, ${colors[0]} 270deg)`,
    };
  } else if (colors.length === 3) {
    inputStyle = {
      background: `conic-gradient(${colors[0]} 0deg 120deg, ${colors[1]} 120deg 240deg, ${colors[2]} 240deg 360deg)`,
    };
  } else if (colors.length === 4) {
    inputStyle = {
      background: `conic-gradient(${colors[0]} 0deg 90deg, ${colors[1]} 90deg 180deg, ${colors[2]} 180deg 270deg, ${colors[3]} 270deg 360deg)`,
    };
  } else if (colors.length === 5) {
    inputStyle = {
      background: `conic-gradient(${colors[0]} 0deg 72deg, ${colors[1]} 72deg 144deg, ${colors[2]} 144deg 216deg, ${colors[3]} 216deg 288deg, ${colors[4]} 288deg 360deg)`,
    };
  } else if (colors.length === 6) {
    inputStyle = {
      background: `conic-gradient(${colors[0]} 0deg 60deg, ${colors[1]} 60deg 120deg, ${colors[2]} 120deg 180deg, ${colors[3]} 180deg 240deg, ${colors[4]} 240deg 300deg, ${colors[5]} 300deg 360deg)`,
    };
  } else if (colors.length === 7) {
    inputStyle = {
      background: `conic-gradient(${colors[0]} 0deg 52deg, ${colors[1]} 52deg 104deg, ${colors[2]} 104deg 156deg, ${colors[3]} 156deg 208deg, ${colors[4]} 208deg 260deg, ${colors[5]} 260deg 312deg, ${colors[6]} 312deg 360deg)`,
    };
  } else if (colors.length === 8) {
    inputStyle = {
      background: `conic-gradient(${colors[0]} 0deg 45deg, ${colors[1]} 45deg 90deg, ${colors[2]} 90deg 135deg, ${colors[3]} 135deg 180deg, ${colors[4]} 180deg 225deg, ${colors[5]} 225deg 270deg, ${colors[6]} 270deg 315deg,${colors[7]} 315deg 360deg)`,
    };
  } else if (colors.length === 9) {
    inputStyle = {
      background: `conic-gradient(${colors[0]} 0deg 40deg, ${colors[1]} 40deg 80deg, ${colors[2]} 80deg 120deg, ${colors[3]} 120deg 160deg, ${colors[4]} 160deg 200deg, ${colors[5]} 200deg 240deg, ${colors[6]} 240deg 280deg,${colors[7]} 280deg 320deg,${colors[8]} 320deg 360deg)`,
    };
  }
  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
      <div>
        <button type="button"
          id={props.id}
          className="dot node-button"
          onClick={props.onclickfunc()}
          onMouseOver={props.hoover()}
          style={inputStyle}
        >
          <img src={props.song.album_cover} id={props.song.id} artist={props.song.artist} genres={props.song.genres} draggable="false" alt="temp" className="round-img" />
        </button>
      </div>
    </Draggable>
  );
}

function TreeNodeUnfilledUI(props) {
  const updateXarrow = useXarrow();
  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
      <button type="button" id={props.id} className="dot node-button unfilled-node" onClick={props.addSongToNode()}>
        <img src={pic} draggable="false" alt="temp" className="round-img" />
      </button>
    </Draggable>
  );
}

function TreeNodeUnfilledAlg(props) {
  const updateXarrow = useXarrow();
  if (Array.isArray(props.song)) {
    const song = props.song[0];
    const song2 = props.song[1];
    const song3 = props.song[2];
    const songid = props.id + props.song[0].id;
    const song2id = props.id + props.song[1].id;
    const song3id = props.id + props.song[2].id;
    console.log(((song.album_cover || song2.album_cover || song3.album_cover) && props.showstat && props.showid === props.id));
    if ((song.album_cover || song2.album_cover || song3.album_cover) && props.showstat && props.showid === props.id) {
      return (
        <div>
          <Xarrow start={props.pref} end={props.id} startAnchor="bottom" endAnchor="top" zIndex={3} showHead={false} dashness color="gray" />

          <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
            <button type="button" id={props.id} className="dot node-button unfilled-node">
              <img src={pic3} draggable="false" alt="temp" className="round-img" />
            </button>
          </Draggable>
          <Xarrow start={props.id} end={songid} startAnchor="bottom" endAnchor="top" zIndex={3} showHead={false} dashness color="gray" />
          <Xarrow start={props.id} end={song2id} startAnchor="bottom" endAnchor="top" zIndex={3} showHead={false} dashness color="gray" />
          <Xarrow start={props.id} end={song3id} startAnchor="bottom" endAnchor="top" zIndex={3} showHead={false} dashness color="gray" />

          <div style={{
            width: '500px',
            height: '120px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
          }}
          >
            <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
              <button type="button" id={songid} onClick={props.clickfunc()} className="dot node-button unfilled-node" style={{ float: 'left' }}>
                <img src={song.album_cover} id={song.id} draggable="false" alt="temp" className="round-img" />
              </button>
            </Draggable>
            <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
              <button type="button" id={song2id} onClick={props.clickfunc()} className="dot node-button unfilled-node" style={{ float: 'left' }}>
                <img src={song2.album_cover} id={song2.id} draggable="false" alt="temp" className="round-img" />
              </button>
            </Draggable>
            <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
              <button type="button" id={song3id} onClick={props.clickfunc()} className="dot node-button unfilled-node" style={{ float: 'right' }}>
                <img src={song3.album_cover} id={song3.id} draggable="false" alt="temp" className="round-img" />
              </button>
            </Draggable>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Xarrow start={props.pref} end={props.id} startAnchor="bottom" endAnchor="top" zIndex={3} showHead={false} dashness color="gray" />
          <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
            <button type="button" id={props.id} className="dot node-button unfilled-node" onClick={props.setStuff()}>
              <img src={pic3} id={props.id} draggable="false" alt="temp" className="round-img" />
            </button>
          </Draggable>
        </div>
      );
    }
  } else {
    return (
      <div>
        <Xarrow start={props.pref} end={props.id} startAnchor="bottom" endAnchor="top" zIndex={3} showHead={false} dashness color="gray" />
        <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
          <button type="button" id={props.id} className="dot node-button unfilled-node">
            <img src={pic} id={props.id} draggable="false" alt="temp" className="round-img" />
          </button>
        </Draggable>
      </div>
    );
  }
}

class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showalg: false,
      showalgid: null,
    };
  }

  /* componentDidMount() {
    const elem = document.getElementById('panzoom-element');
    const panzoom = Panzoom(elem, {
      contain: 'outside', startScale: 1,
    });
    panzoom.zoom(1);
    setTimeout(() => panzoom.pan(100, 100));
  }
 */

  getEdges(tree, l, t, i, pref, isPlayMode) {
    const inputstyle = {
      position: 'absolute',
      top: t,
      left: l,
    };
    if (tree && tree.root.visible) {
      if (tree && tree.root.rec !== 0) {
        if (tree.root.rec === 1) {
          if (pref) {
            return (
              <div style={inputstyle}>
                <Xarrow start={pref} end={tree.root.name} startAnchor="bottom" endAnchor="top" zIndex={3} showHead={false} dashness color="gray" />
                <TreeNodeUnfilledUI addSongToNode={this.props.addSongToNode} id={tree.root.name} />
              </div>
            );
          } else {
            return (
              <div style={inputstyle}>
                <TreeNodeUnfilledUI addSongToNode={this.props.addSongToNode} id={tree.root.name} />
              </div>
            );
          }
        } else {
          return (
            <div style={inputstyle}>
              <TreeNodeUnfilledAlg pref={pref} id={tree.root.name} showid={this.state.showalgid} showstat={this.state.showalg} song={tree.root.song} clickfunc={this.props.choosealg} setStuff={() => this.toShow} />
            </div>
          );
        }
      } else if (pref) {
        if (tree.root.rec !== 0) {
          return (
            <div>
              <div style={inputstyle}>
                <TreeNode2 id={tree.root.name} root={tree.root} hoover={this.props.hoover} tree={tree} song={tree.root.song} onClickNode={this.props.onClickNode} tool_mode={this.props.tool} onclickfunc={this.props.clickfunc} deleteNodes={this.props.deleteNodes} onShowChildren={this.props.onShowChildren} />
              </div>
              <Xarrow start={pref} end={tree.root.name} startAnchor="bottom" endAnchor="top" zIndex={3} showHead={false} dashness color="gray" />
              {this.getEdges(tree.left, l - i, t + 150, i / 2, tree.root.name)}
              {this.getEdges(tree.right, l + i, t + 150, i / 2, tree.root.name)}
            </div>
          );
        } else {
          return (
            <div>
              <div style={inputstyle}>
                <TreeNode2 id={tree.root.name} root={tree.root} onclickfunc={this.props.clickfunc} tree={tree} song={tree.root.song} onClickNode={this.props.onClickNode} tool_mode={this.props.tool} hoover={this.props.hoover} deleteNodes={this.props.deleteNodes} onShowChildren={this.props.onShowChildren} />
              </div>
              <Xarrow start={pref} end={tree.root.name} startAnchor="bottom" strokeWidth={tree.root.weight} endAnchor="top" zIndex={3} showHead={false} color="#637B47" />
              {this.getEdges(tree.left, l - i, t + 150, i / 2, tree.root.name)}
              {this.getEdges(tree.right, l + i, t + 150, i / 2, tree.root.name)}
            </div>
          );
        }
      } else {
        return (
          <div>
            <div style={inputstyle}>
              <TreeNode2 id={tree.root.name} root={tree.root} tree={tree} hoover={this.props.hoover} song={tree.root.song} onclickfunc={this.props.clickfunc} onClickNode={this.props.onClickNode} tool_mode={this.props.tool} deleteNodes={this.props.deleteNodes} onShowChildren={this.props.onShowChildren} />
            </div>
            {this.getEdges(tree.left, l - i, t + 150, i / 2, tree.root.name)}
            {this.getEdges(tree.right, l + i, t + 150, i / 2, tree.root.name)}
          </div>
        );
      }
    } else {
      return null;
    }
  }

  toShow = (e) => {
    this.setState({ showalg: true, showalgid: e.target.id });
  };

  render() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return (
      <div id="currTree"
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '100%',
          overflow: 'scroll',
          height: '80%',
          borderColor: 'black',
          position: 'relative',
        }}
      >
        <Xwrapper>
          {this.getEdges(this.props.tree, w / 2, 100, w / 4, null, this.props.isPlayMode)}
        </Xwrapper>
      </div>
    );
  }
}

export default Tree;
