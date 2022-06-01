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
import pic2 from '../../loads.png';
import * as db from '../../services/firestore';

function TreeNode2(props) {
  const updateXarrow = useXarrow();

  /* function playSong(song) {
    console.log(`playSong:${song.name}`);
  } */
  const hoverHandler = () => {
    console.log('onMouseEnter');
  };
  let inputStyle = {
    background: '#96A66D',
  };
  if (props.tree.root.attr !== '') {
    if (props.tree.root.attr === 'mood') {
      inputStyle = {
        background: 'blue',
      };
    } else if (props.tree.root.attr === 'tempo') {
      inputStyle = {
        background: 'orange',
      };
    } else {
      inputStyle = {
        background: 'yellow',
      };
    }
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
    if (song.album_cover && props.showstat && props.showid === props.id) {
      return (
        <div>
          <Xarrow start={props.pref} end={props.id} startAnchor="bottom" endAnchor="top" zIndex={3} showHead={false} dashness color="gray" />

          <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
            <button type="button" id={props.id} className="dot node-button unfilled-node">
              <img src={pic2} draggable="false" alt="temp" className="round-img" />
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
              <img src={pic2} id={props.id} draggable="false" alt="temp" className="round-img" />
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
                <TreeNode2 id={tree.root.name} hoover={this.props.hoover} tree={tree} song={tree.root.song} onClickNode={this.props.onClickNode} tool_mode={this.props.tool} onclickfunc={this.props.clickfunc} deleteNodes={this.props.deleteNodes} onShowChildren={this.props.onShowChildren} />
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
                <TreeNode2 id={tree.root.name} onclickfunc={this.props.clickfunc} tree={tree} song={tree.root.song} onClickNode={this.props.onClickNode} tool_mode={this.props.tool} hoover={this.props.hoover} deleteNodes={this.props.deleteNodes} onShowChildren={this.props.onShowChildren} />
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
              <TreeNode2 id={tree.root.name} tree={tree} hoover={this.props.hoover} song={tree.root.song} onclickfunc={this.props.clickfunc} onClickNode={this.props.onClickNode} tool_mode={this.props.tool} deleteNodes={this.props.deleteNodes} onShowChildren={this.props.onShowChildren} />
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
    console.log(e.target.id);
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
