/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import update from 'react-addons-update';
// import TreeNode from './tree-node';
import UnfilledNode from './unfilled-node';
// import Edge from './tree-edge';

// eslint-disable
// TODO create tree with edges and nodes combined
class DefaultTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // c: 'green',
      layers: [[<UnfilledNode t="1" />], [<UnfilledNode t="2" />, <UnfilledNode t="3" />], [<UnfilledNode t="4" />, <UnfilledNode t="5" />, <UnfilledNode t="6" />, <UnfilledNode t="7" />]],
      ll: 0,
      multi: 2,
      currid: 1,
    };
  }

  // cred:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log
  getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }

  getChildren = (pid) => {
    const childNum = 2;
    let layer;
    if (pid === 1) {
      layer = 0;
    } else {
      layer = Math.floor(this.getBaseLog(childNum, pid));
    }
    const layerLen = childNum ** layer;
    let total = 0;
    for (let i = 0; i <= layer; i++) {
      total += childNum ** i;
    }
    const pos = layerLen - (total - pid);
    const c1 = total + (pos * childNum);
    return [String(c1 - 1), String(c1)];
  };

  centerOfElement = (id) => {
    const elt = document.getElementById(id);
    console.log(elt);
    if (elt) {
      const pos = elt.getBoundingClientRect();
      return ([
        pos.left + (pos.width / 2),
        pos.top + (pos.height / 2)]
      );
    } return 0;
  };

  addNode = () => {
    if (this.state.layers[this.state.ll].length >= this.state.multi) {
      this.setState((prevState) => ({
        layers: [...prevState.layers, [<UnfilledNode t={this.state.currid} />]],
        ll: prevState.ll + 1,
        multi: prevState.multi * 2,
      }));
    } else {
      this.setState(update(this.state, {
        layers: {
          [this.state.ll]: {
            $set: [...this.state.layers[this.state.ll], <UnfilledNode t={this.state.currid} />],
          },
        },
      }));
    }
    this.setState((prevState) => ({ currid: prevState.currid + 1 }));
  };

  addLayer = () => {
    const newLayer = [];
    let id = this.state.currid;
    for (let i = 0; i < 2 ** this.state.ll; i++) {
      newLayer.push(<UnfilledNode t={String(id)} />);
      id += 1;
    }
    this.setState((prevState) => ({
      layers: [...prevState.layers, newLayer],
      currid: id,
      ll: prevState.ll + 1,
    }));
  };

  showEdge = (pid, cid) => {
    console.log(`childID:${cid}`);
    const loc1 = this.centerOfElement(pid);
    const loc2 = this.centerOfElement(cid);

    const inputStyle = {
      stroke: '#637B47',
      position: 'absolute',
      strokeWidth: 4,
    };
    console.log(`parent:${String(loc1)}`);
    console.log(`Child:${String(loc2)}`);

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
      /*   <svg>
        <line style={inputStyle} x1={String(loc1[0])} y1={String(loc1[1])} x2={String(loc2[0])} y2={String(loc2[1])}/>
      </svg> */
      return (
        <path style={inputStyle} d={dd} />);
    } return <div />;
  };

  showNodespt2 = (list) => {
    return list.map((node) => <li>{node}</li>);
  };

  showNodes = () => {
    return this.state.layers.map((list) => <div className="layer">{this.showNodespt2(list)}</div>);
  };

  showEdges() {
    const edges = [];
    let id = 1;
    console.log(`what i want${String(this.state.layers.length)}`);
    for (let i = 0; i < this.state.layers.length - 1; i++) {
      for (let j = 0; j < this.state.layers[i].length; j++) {
        const children = this.getChildren(id);
        console.log(children);
        const e1 = this.showEdge(id, children[0]);
        if (e1) {
          edges.push(e1);
        }
        const e2 = this.showEdge(id, children[1]);
        if (e2) {
          edges.push(e2);
        }
        id += 1;
      }
    }
    if (edges.length > 0) {
      console.log(edges);
      return (
        <div className="lines" style={{ fillOpacity: '0' }}>
          <svg>
            {edges.map((edge) => { return edge; })}
          </svg>
        </div>
      );
    } else {
      return (<div>this bitch empty</div>);
    }
  }

  render() {
    return (
      <div>
        <div>
          <button
            type="button"
            onClick={this.addLayer}
          >Add Node
          </button>

          {this.showNodes()}
          {this.showEdges()}

          {/* <TreeNode a={this.state.c}/> */}
        </div>
        <div>
          {/* this.showEdges('0', '2') */}
        </div>
      </div>
    );
  }
}
export default DefaultTree;
