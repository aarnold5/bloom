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

  renderNodes() {
    if (this.props.layers.length !== 0) { // if layers isn't empty
      /* if (this.props.layers.length === 1) { // if there is only one node
        const nodeList = this.props.layers.map((node) => {
          return <li><AltTreeNode key={node.song.id} song={node.song} runAlgo={this.props.runAlgo} /></li>;
        });
        return nodeList;
      } else  */
      if (this.props.layers.length > 0) {
        const layersList = this.props.layers.map((layer) => {
          if (layer.length > 1) {
            const nodeList = layer.map((node) => {
              return <li><AltTreeNode key={node.song.id} song={node.song} runAlgo={this.props.runAlgo} /></li>;
            });
            return <div className="layer">{nodeList}</div>;
          }
          return <div className="layer"><li><AltTreeNode key={layer.song.id} song={layer.song} runAlgo={this.props.runAlgo} /></li></div>;
        });
        return layersList;
      }

      /* if (this.props.layers.length > 1) {
        console.log(this.props.layers);
        this.props.layers.map((layer) => {
          if (layer.length > 1) {
            layer.map((node) => {
              console.log(node);
              return <div />;
            });
          }
          console.log(layer);
          return <div />;
        });
        return <div />;
      } */

      // const layersList = this.props.layers.map((layer) => {
      /* const nodeList = layer.map((node) => {
          return <li><AltTreeNode key={node.song.id} song={node.song} runAlgo={this.props.runAlgo} /></li>;
        });
        return <div className="layers">bleh</div>;
      });
      return layersList; */
    } return <div />;
  }

  render() {
    return <div className="tree">{this.renderNodes()}</div>;
  }
}

export default AltTree;
