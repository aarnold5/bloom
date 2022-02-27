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
      layers: [[<TreeNode />], [<TreeNode />, <TreeNode />]],
      ll: 1,
      multi: 2,
    };
  }

  addNode = () => {
    if (this.state.layers[this.state.ll].length >= this.state.multi) {
      this.setState((prevState) => ({
        layers: [...prevState.layers, [<TreeNode />]],
        ll: prevState.ll + 1,
        multi: prevState.multi * 2,
      }));
      console.log('worked');
    } else {
      this.setState(update(this.state, {
        layers: {
          [this.state.ll]: {
            $set: [...this.state.layers[this.state.ll], <TreeNode />],
          },
        },
      }));
    }
  };

  /* showNodes = () => {
    /* const xv = 100;
    const yv = 100;
    return this.state.arr.map((node) => <li>{node}</li>);
  }; */
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
        <button
          type="button"
          onClick={this.addNode}
        >Add Node
        </button>
        {this.showNodes()}
        {/* <TreeNode a={this.state.c}/> */}
      </div>
    );
  }
}
export default Tree;
