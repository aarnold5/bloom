/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import update from 'react-addons-update';
import TreeNode from './tree-node';

// eslint-disable-next-line no-unused-vars
// TODO create tree with edges and nodes combined
class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // c: 'green',
      layers: [[<TreeNode t={0} />], [<TreeNode t={1} parent="0" />, <TreeNode t={2} parent="0" />]],
      ll: 1,
      multi: 2,
      currid: 3,
    };
  }

  // eslint-disable-next-line consistent-return
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

  addNode = () => {
    if (this.state.layers[this.state.ll].length >= this.state.multi) {
      this.setState((prevState) => ({
        layers: [...prevState.layers, [<TreeNode t={this.state.currid} />]],
        ll: prevState.ll + 1,
        multi: prevState.multi * 2,
      }));
    } else {
      this.setState(update(this.state, {
        layers: {
          [this.state.ll]: {
            $set: [...this.state.layers[this.state.ll], <TreeNode t={this.state.currid} />],
          },
        },
      }));
    }
    this.setState((prevState) => ({ currid: prevState.currid + 1 }));
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
          {/*   <svg>
        <line style={inputStyle} x1={String(loc1[0])} y1={String(loc1[1])} x2={String(loc2[0])} y2={String(loc2[1])}/>
      </svg> */}
          <svg>
            <path style={inputStyle} d={dd} />
          </svg>
        </div>
      );
    }
  };

  /*
  showEdges2 = () => {
    return this.state.layers.map((list) => <div>{this.se(list)}</div>);
  }
  se = (list) => {
    if (list[0].parent){
      return list.map((n) => <li>{this.showEdges('0','1')}</li>);
    }
  } */
  showNodespt2 = (list) => {
    return list.map((node) => <li>{node}</li>);
  };

  showNodes = () => {
    return this.state.layers.map((list) => <div className="layer">{this.showNodespt2(list)}</div>);
  };

  /* changeColor = () => {
    if (this.state.c === 'green') {
      this.setState({ c: 'blue' });
    } else if (this.state.c === 'blue') {
      this.setState({ c: 'orange' });
    } else {
      this.setState({ c: 'green' });
    }
  }; */

  render() {
    return (
      <div>
        <div>
          <button
            type="button"
            onClick={this.addNode}
          >Add Node
          </button>

          {this.showNodes()}

          {/* <TreeNode a={this.state.c}/> */}
        </div>
        <div>
          {/* this.showEdges('0', '2') */}
          {this.showEdges('0', '1')}
          {this.showEdges('1', '3')}
          {this.showEdges('0', '2')}
          {this.showEdges('1', '4')}
          {this.showEdges('2', '5')}
          {this.showEdges('2', '6')}
        </div>
      </div>
    );
  }
}
export default Tree;
