import React, { Component } from 'react';
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
      if (this.props.layers.length > 0) {
        const layersList = this.props.layers.map((layer) => {
          if (layer.length > 1) {
            const nodeList = layer.map((node) => {
              return <li><AltTreeNode key={node.song.id} song={node.song} runAlgo={this.props.runAlgo} /></li>;
            });
            return <div className="layer">{nodeList}</div>;
          }
          // else render layer with only one node
          return <div className="layer"><li><AltTreeNode key={layer.song.id} song={layer.song} runAlgo={this.props.runAlgo} /></li></div>;
        });
        return layersList;
      }
    } return <div />;
  }

  render() {
    return <div className="tree">{this.renderNodes()}</div>;
  }
}

export default AltTree;
