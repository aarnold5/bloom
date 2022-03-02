import React, { Component } from 'react';
// import debounce from 'lodash.debounce';
// import { bloomSearch } from './search';
import SearchBar from './search-bar';
import Suggestion from './suggestion';
// import Suggestion from './suggestion';

class SearchSuggestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // searchSuggestions: [],
      // selectedSuggestion: null,
    };

    // this.search = debounce(this.search, 300);
  }

  /* search = (text) => {
    bloomSearch(text).then((searchSuggestions) => {
      this.setState({
        searchSuggestions,
        // selectedSuggestion: searchSuggestions[0],
      });
    });
  }; */

  /* onInputChange = (event) => {
    this.setState({ searchterm: event.target.value });
    // console.log(event.target.value);
    bloomSearch(event.target.value)
      .then((result) => this.setState({ searchSuggestions: result }));
    // .then((result) => console.log(result));
    // console.log(this.state.searchSuggestions);
  }; */

  renderSearchSuggestions() {
    if (this.props.searchSuggestions.length > 0) {
      const sugList = this.props.searchSuggestions.map((suggestion) => {
        return <Suggestion name={suggestion.name} albumCover={suggestion.album_cover} />;
      });
      return sugList;
    }
    return <div />;

    /* if (this.props.searchSuggestions.length !== 0) {
      this.props.searchSuggestions.map((suggestion) => {
        return (
          <div className="searchSuggestion"><img alt={suggestion.name} src={suggestion.album_cover} /><p>{suggestion.name}</p></div>
          // <div>{console.log(suggestion.name)}</div>
          // <Suggestion name={suggestion.name}>{console.log(suggestion.name)}</Suggestion>
        );
      });
    }
    return <div />; */
  }

  render() {
    return (
      <div>
        <SearchBar onSearchChange={this.props.onSearchChange} />
        <div className="suggestion-box">
          {this.renderSearchSuggestions()}
        </div>
      </div>
    );
  }
}
export default SearchSuggestions;
