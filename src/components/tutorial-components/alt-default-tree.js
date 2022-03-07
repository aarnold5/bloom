/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import AltDefaultNode from './alt-default-node';

// eslint-disable-next-line no-unused-vars
// TODO create tree with edges and nodes combined
class AltDefaultTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line max-len
    };
  }

  renderNodes() {
    return this.props.layers.map((layers) => {
      if (layers.length === 3) {
        return (
          <div>
            <div className="layer">
              <li><AltDefaultNode song={this.props.layers[0]} layers={this.props.layers} key={0} id={0} fillNode={() => this.props.fillNode(0)} filled /></li>
            </div>
            <div className="layer">
              <li><AltDefaultNode song={this.props.layers[1]} layers={this.props.layers} key={1} id={1} fillNode={() => this.props.fillNode(1)} filled /></li>
              <li><AltDefaultNode song={this.props.layers[2]} layers={this.props.layers} key={2} id={2} fillNode={() => this.props.fillNode(2)} filled /></li>
            </div>;
          </div>
        );
      } else if (layers.length === 1) {
        return (
          <div>
            <div className="layer">
              <li><AltDefaultNode song={this.props.layers[0]} layers={this.props.layers} key={0} id={0} fillNode={() => this.props.fillNode(0)} filled /></li>
            </div>
            <div className="layer">
              <li><AltDefaultNode layers={this.props.layers} key={1} id={1} fillNode={() => this.props.fillNode(1)} unFilled /></li>
              <li><AltDefaultNode layers={this.props.layers} key={2} id={2} fillNode={() => this.props.fillNode(2)} unFilled /></li>
            </div>;
          </div>
        );
      } else if (layers.length === 2) {
        return (
          <div>
            <div className="layer">
              <li><AltDefaultNode song={this.props.layers[0]} layers={this.props.layers} key={0} id={0} fillNode={() => this.props.fillNode(0)} filled /></li>
            </div>
            <div className="layer">
              <li><AltDefaultNode song={this.props.layers[1]} layers={this.props.layers} key={1} id={1} fillNode={() => this.props.fillNode(1)} filled /></li>
              <li><AltDefaultNode layers={this.props.layers} key={2} id={2} fillNode={() => this.props.fillNode(2)} unFilled /></li>
            </div>;
          </div>
        );
      } return (
        <div>
          <div className="layer">
            <li><AltDefaultNode layers={this.props.layers} key={0} id={0} fillNode={() => this.props.fillNode(0)} unFilled /></li>
          </div>
          <div className="layer">
            <li><AltDefaultNode layers={this.props.layers} key={1} id={1} fillNode={() => this.props.fillNode(1)} unFilled /></li>
            <li><AltDefaultNode layers={this.props.layers} key={2} id={2} fillNode={() => this.props.fillNode(2)} unFilled /></li>
          </div>;
        </div>
      );
    });
  }

  render() {
    return <div className="tree">{this.renderNodes()}</div>;
  }
}

export default AltDefaultTree;
