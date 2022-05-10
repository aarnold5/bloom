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

  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
      <div>
        <button type="button" id={props.id} className="dot node-button" onClick={() => props.onClickNode(props.id)}>
          <img src={props.album} draggable="false" alt="temp" className="round-img" />
        </button>
      </div>
    </Draggable>
  );
}

class Tree extends React.Component {
  constructor(props) {
    super(props);
  }

  getEdges(tree, l, t, i, pref, isPlayMode) {
    const inputstyle = {
      position: 'absolute',
      top: t,
      left: l,
    };
    if (tree && tree.root.visible) {
      if (pref) {
        if (tree.root.rec) {
          return (
            <div>
              <div style={inputstyle}>
                <TreeNode2 id={tree.root.name} song={tree.root.song} album={tree.root.song.album_cover} onClickNode={this.props.onClickNode} />
              </div>
              <Xarrow start={pref} end={tree.root.name} startAnchor="bottom" endAnchor="top" zIndex={3} showHead={false} dashness color="gray" />
              {this.getEdges(tree.left, l - i, t + 150, i / 2, tree.root.name)}
              {this.getEdges(tree.right, l + i, t + 150, i / 2, tree.root.name)}
            </div>
          );
        } else {
          return (
            <div>
              <div style={inputstyle}><TreeNode2 id={tree.root.name} song={tree.root.song} album={tree.root.song.album_cover} onClickNode={this.props.onClickNode} />
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
              <TreeNode2 id={tree.root.name} song={tree.root.song} album={tree.root.song.album_cover} onClickNode={this.props.onClickNode} />
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
    const t = {
      root: {
        name: 'a',
        rec: false,
      },
      left: {
        root: { name: 'b' },
        left: {
          root: {
            name: 'd',
            rec: false,
          },
          left: null,
          right: null,
        },
        right: {
          root: {
            name: 'e',
            rec: true,
          },
          left: null,
          right: null,
        },
      },
      right: {
        root: { name: 'c' },
        left: {
          root: {
            name: 'f',
            rec: false,
          },
          left: null,
          right: null,
        },
        right: {
          root: {
            name: 'g',
            rec: false,
          },
          left: null,
          right: null,
        },
      },
    };
    const w = window.innerWidth;
    const h = window.innerHeight;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
        <Xwrapper>
          {this.getEdges(this.props.tree, w / 2, 100, w / 4, null, this.props.isPlayMode)}
        </Xwrapper>
      </div>
    );
  }
}

export default Tree;
