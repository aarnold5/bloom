/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import update from 'react-addons-update';
import AltTreeNode from './alt-tree-node';

// eslint-disable-next-line no-unused-vars
// TODO create tree with edges and nodes combined
class AltTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // layers: this.props.layers,
    };
  }

  renderNode() {
    console.log(this.props.layers);
    if (this.props.layers.length !== 0) {
      const nodeList = this.props.layers.map((node) => {
        return <AltTreeNode key={node.song.id} song={node.song} runAlgo={this.props.runAlgo} />;
      });
      return nodeList;
    } return <div />;
  }

  render() {
    return <div>{this.renderNode()}</div>;
  }
}

export default AltTree;
