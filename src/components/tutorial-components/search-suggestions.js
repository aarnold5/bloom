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
        // eslint-disable-next-line max-len
        return <Suggestion onClick={() => this.props.onSelectSong(suggestion)} key={suggestion.id} id={suggestion.id} name={suggestion.name} album_cover={suggestion.album_cover} />;
      });
      return sugList;
    }
    return <div />;
  }

  renderSearch() {
    if (this.props.searching === true) {
      return (
        <div>
          <SearchBar className="search-bar" onSearchChange={this.props.onSearchChange} />
          <div className="suggestion-box" style={{ flex: 'left', position: 'fixed', zIndex: '8' }}>
            {this.renderSearchSuggestions()}
          </div>
        </div>
      );
    } return <div />;
  }

  render() {
    return (
      this.renderSearch()
    );
  }
}
export default SearchSuggestions;
