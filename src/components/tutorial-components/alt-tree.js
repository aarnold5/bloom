/* eslint-disable class-methods-use-this */
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

  /* // eslint-disable-next-line consistent-return
  centerOfElement = (id) => {
    const elt = document.getElementById(id);
    console.log(elt);
    if (elt) {
      const pos = elt.getBoundingClientRect();
      return ([
        pos.left + (pos.width / 2),
        pos.top + (pos.height / 2)]
      );
    }
  };

  showEdges = (pid, cid) => {
    const loc1 = this.centerOfElement(pid);
    const loc2 = this.centerOfElement(cid);

    const inputStyle = {
      stroke: 'red',
      position: 'absolute',
    };

    if (loc1 && loc2) {
      const x1 = loc1[0];
      const y1 = loc1[1];
      const x2 = loc2[0];
      const y2 = loc2[1];
      const dx = x1 - x2;
      const dy = y1 - y2;
      let stretch = -60;
      if (dx > 56.5) {
        stretch = -60 - dx + 58.5;
      }
      const dd = `M ${String(x1)} ${String(y1)}L${String(x2)} ${String(y2)}`;
      // const dd = 'M '+ String(x1)+ ' '+ String(y1) +'l0 50'+' '+'c1 23.5 -25.5 15 ' +String(stretch)+ ' 20 c -15.5 5 -16.5 13 -18.5 43.5' +'L'+String(x2) + ' ' + String(y2);

      console.log(dd);
      return (
        <div className="lines" style={{ fillOpacity: '0' }}>
             <svg>
        <line style={inputStyle} x1={String(loc1[0])} y1={String(loc1[1])} x2={String(loc2[0])} y2={String(loc2[1])}/>
      </svg>
          <svg>
            <path style={inputStyle} d={dd} />
          </svg>
        </div>
      );
    }
  }; */

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
    return <div className="tree">{this.renderNodes()}{console.log(this.props.layers)}</div>;
  }
}

export default AltTree;
