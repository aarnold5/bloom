/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { searchterm: '' };
  }

  onInputChange = (event) => {
    this.setState({ searchterm: event.target.value });
    console.log(event.target.value);
  };

  render() {
    return (
      <div>
        <input onChange={this.onInputChange} value={this.state.searchterm} />
      </div>
    );
  }
}

export default SearchBar;
