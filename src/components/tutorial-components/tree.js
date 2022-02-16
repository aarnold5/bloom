import React, { Component } from 'react';
import TreeNode from './tree-node';

// eslint-disable-next-line no-unused-vars
// TODO create tree with edges and nodes combined
class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      c: 'green',
    };
  }

  changeColor = () => {
    if (this.state.c === 'green') {
      this.setState({ c: 'blue' });
    } else if (this.state.c === 'blue') {
      this.setState({ c: 'orange' });
    } else {
      this.setState({ c: 'green' });
    }
  };

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={this.changeColor}
        >changeColor
        </button>
        <TreeNode a={this.state.c} />
      </div>
    );
  }
}
export default Tree;
