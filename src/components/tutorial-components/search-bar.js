import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchterm: '',
    };
  }

  onInputChange = (event) => {
    this.props.onSearchChange(event.target.value);
    this.setState({ searchterm: event.target.value });
  };

  render() {
    return (
      <div className="input-and-x">
        <input onChange={this.onInputChange} value={this.state.searchterm} style={{ zIndex: 7 }} />
        <button type="button" className="playlist-button" onClick={this.props.cancelSearch}>X</button>
      </div>
    );
  }
}

export default SearchBar;
