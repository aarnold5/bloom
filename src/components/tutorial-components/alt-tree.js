/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import update from 'react-addons-update';
import TreeNode from './tree-node';

// eslint-disable-next-line no-unused-vars
// TODO create tree with edges and nodes combined
class AltTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currTree: this.props.currTree,
    };
  }

  renderNode() {
    console.log(this.state.currTree);
    if (this.state.currTree) {
      const nodeList = this.state.currTree.layers.map((node) => {
        if (node.unFilled) {
          return <TreeNode />;
        } else {
          return <TreeNode />;
        }
      });
      return nodeList;
    }
  }

  render() {
    return <div>{this.renderNode()}</div>;
  }
}

export default AltTree;
