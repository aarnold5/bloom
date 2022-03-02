import React, { Component } from 'react';
import SearchBar from './search-bar';
import Suggestion from './suggestion';

class SearchSuggestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  renderSearchSuggestions() {
    if (this.props.searchSuggestions.length > 0) {
      const sugList = this.props.searchSuggestions.map((suggestion) => {
        return <Suggestion name={suggestion.name} albumCover={suggestion.album_cover} />;
      });
      return sugList;
    }
    return <div />;
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
