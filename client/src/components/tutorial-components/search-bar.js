import React, { Component } from 'react';
// import debounce from 'lodash.debounce';

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
    // console.log(event.target.value);
  };

  render() {
    return (
      <input onChange={this.onInputChange} value={this.state.searchterm} />
    );
  }
}

export default SearchBar;
