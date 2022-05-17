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
import * as db from '../../services/firestore';

function TreeNode2(props) {
  const updateXarrow = useXarrow();

  /* function playSong(song) {
    console.log(`playSong:${song.name}`);
  }

  function showRec() {
    console.log('showRec');
    // call update function to update the tree on the database
    // props.tree.left.root.visible = true;
    // if (props.tree.root.rec === 1) {
    // }
  } */

  /* function handleClick(isPlayMode, song) {
    console.log('click');
    if (isPlayMode) {
      playSong(song);
    } else {
      showRec();
    }
  } */
  if (props.tool_mode !== 'select') {
    if (props.tool_mode === 'play') {
      return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow} disabled>
          <div>
            <button type="button" id={props.id} className="dot node-button" onClick={() => props.onClickNode(props.id)}>
              <img src={props.song.album_cover} draggable="false" alt="temp" className="round-img" />
            </button>
          </div>
        </Draggable>
      );
    } else if (props.tool_mode === 'cut') {
      return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow} disabled>
          <div>
            <button type="button" id={props.song.id} className="dot node-button" onClick={props.deleteNodes(props.song.id)}>
              <img src={props.song.album_cover} id={props.song.id} draggable="false" alt="temp" className="round-img" />
            </button>
          </div>
        </Draggable>
      );
    } else if (props.tool_mode === 'weight') {
      return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow} disabled>
          <div>
            <button type="button" id={props.id} className="dot node-button" onClick={() => props.onClickNode(props.id)}>
              <img src={props.song.album_cover} draggable="false" alt="temp" className="round-img" />
            </button>
          </div>
        </Draggable>
      );
    } else {
      return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow} disabled>
          <div>
            <button type="button" id={props.id} className="dot node-button">
              <img src={props.song.album_cover} draggable="false" alt="temp" className="round-img" />
            </button>
          </div>
        </Draggable>
      );
    }
  } else {
    return (
      <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
        <div>
          <button type="button" id={props.id} className="dot node-button" value={props.song.id} onClick={props.onShowChildren(props.song.id)}>
            <img src={props.song.album_cover} draggable="false" alt="temp" className="round-img" />
          </button>
        </div>
      </Draggable>
    );
  }
}

function TreeNodeUnfilled(props) {
  return (
    <button type="button" className="dot node-button unfilled-node" onClick={props.addSongToNode()}>
      <img src="https://github.com/aarnold5/bloom/blob/adding-delete-node-functionality/src/plus.png?raw=true" draggable="false" alt="temp" className="round-img" />
    </button>
  );
}

class Tree extends React.Component {
  constructor(props) {
    super(props);
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
    const inputstyleUnfilled = {
      position: 'absolute',
      top: t,
      left: l,
    };
    if (tree && tree.root.visible) {
      if (tree && tree.root.rec === 1) {
        return (
          <div style={inputstyle}>
            <TreeNodeUnfilled addSongToNode={() => this.props.addSongToNode} />
          </div>
        );
      } else if (pref) {
        if (tree.root.rec) {
          return (
            <div>
              <div style={inputstyle}>
                <TreeNode2 id={tree.root.name} tree={tree} song={tree.root.song} onClickNode={this.props.onClickNode} tool_mode={this.props.tool} deleteNodes={this.props.deleteNodes} onShowChildren={this.props.onShowChildren} />
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
                <TreeNode2 id={tree.root.name} tree={tree} song={tree.root.song} onClickNode={this.props.onClickNode} tool_mode={this.props.tool} deleteNodes={this.props.deleteNodes} onShowChildren={this.props.onShowChildren} />
              </div>
              <Xarrow start={pref} end={tree.root.name} startAnchor="bottom" endAnchor="top" zIndex={3} showHead={false} color="#637B47" />
              {this.getEdges(tree.left, l - i, t + 150, i / 2, tree.root.name)}
              {this.getEdges(tree.right, l + i, t + 150, i / 2, tree.root.name)}
            </div>
          );
        }
      } else {
        return (
          <div>
            <div style={inputstyle}>
              <TreeNode2 id={tree.root.name} tree={tree} song={tree.root.song} onClickNode={this.props.onClickNode} tool_mode={this.props.tool} deleteNodes={this.props.deleteNodes} onShowChildren={this.props.onShowChildren} />
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

  render() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return (
      <div id="currTree" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
        <Xwrapper>
          {this.getEdges(this.props.tree, w / 2, 100, w / 4, null, this.props.isPlayMode)}
        </Xwrapper>
      </div>
    );
  }
}

export default Tree;
