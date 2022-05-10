/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const sstyle = { background: '#6B7259' };
    if (this.props.tool === 'cut') {
      return (
        <div id="tool-bar" className="container">
          <button type="button" className="toolbar-button" onClick={this.props.setMinus}>
            <i className="fa-solid fa-minus" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setPlus}>
            <i className="fa-solid fa-plus" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.addRootNode}>
            <i className="fa-solid fa-seedling" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setCut} style={sstyle}>
            <i className="fa-solid fa-scissors" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setW}>
            <i className="fa-solid fa-dumbbell" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setPlay}>
            <i className="fa-solid fa-play" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setSel}>
            <i className="fa-solid fa-arrow-pointer" />
          </button>
        </div>
      );
    } if (this.props.tool === 'play') {
      return (
        <div id="tool-bar" className="container">
          <button type="button" className="toolbar-button" onClick={this.props.setMinus}>
            <i className="fa-solid fa-minus" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setPlus}>
            <i className="fa-solid fa-plus" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.addRootNode}>
            <i className="fa-solid fa-seedling" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setCut}>
            <i className="fa-solid fa-scissors" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setW}>
            <i className="fa-solid fa-dumbbell" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setPlay} style={sstyle}>
            <i className="fa-solid fa-play" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setSel}>
            <i className="fa-solid fa-arrow-pointer" />
          </button>
        </div>
      );
    } if (this.props.tool === 'plus') {
      return (
        <div id="tool-bar" className="container">
          <button type="button" className="toolbar-button" onClick={this.props.setMinus}>
            <i className="fa-solid fa-minus" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setPlus} style={sstyle}>
            <i className="fa-solid fa-plus" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.addRootNode}>
            <i className="fa-solid fa-seedling" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setCut}>
            <i className="fa-solid fa-scissors" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setW}>
            <i className="fa-solid fa-dumbbell" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setPlay}>
            <i className="fa-solid fa-play" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setSel}>
            <i className="fa-solid fa-arrow-pointer" />
          </button>
        </div>
      );
    } if (this.props.tool === 'weight') {
      return (
        <div id="tool-bar" className="container">
          <button type="button" className="toolbar-button" onClick={this.props.setMinus}>
            <i className="fa-solid fa-minus" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setPlus}>
            <i className="fa-solid fa-plus" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.addRootNode}>
            <i className="fa-solid fa-seedling" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setCut}>
            <i className="fa-solid fa-scissors" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setW} style={sstyle}>
            <i className="fa-solid fa-dumbbell" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setPlay}>
            <i className="fa-solid fa-play" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setSel}>
            <i className="fa-solid fa-arrow-pointer" />
          </button>
        </div>
      );
    } if (this.props.tool === 'minus') {
      return (
        <div id="tool-bar" className="container">
          <button type="button" className="toolbar-button" onClick={this.props.setMinus} style={sstyle}>
            <i className="fa-solid fa-minus" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setPlus}>
            <i className="fa-solid fa-plus" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.addRootNode}>
            <i className="fa-solid fa-seedling" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setCut}>
            <i className="fa-solid fa-scissors" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setW}>
            <i className="fa-solid fa-dumbbell" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setPlay}>
            <i className="fa-solid fa-play" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setSel}>
            <i className="fa-solid fa-arrow-pointer" />
          </button>
        </div>
      );
    } else {
      return (
        <div id="tool-bar" className="container">
          <button type="button" className="toolbar-button" onClick={this.props.setMinus}>
            <i className="fa-solid fa-minus" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setPlus}>
            <i className="fa-solid fa-plus" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.addRootNode}>
            <i className="fa-solid fa-seedling" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setCut}>
            <i className="fa-solid fa-scissors" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setW}>
            <i className="fa-solid fa-dumbbell" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setPlay}>
            <i className="fa-solid fa-play" />
          </button>
          <button type="button" className="toolbar-button" onClick={this.props.setSel} style={sstyle}>
            <i className="fa-solid fa-arrow-pointer" />
          </button>
        </div>
      );
    }
  }
}

export default ToolBar;
