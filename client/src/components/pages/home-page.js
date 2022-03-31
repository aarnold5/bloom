import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../nav-bar';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {}; // nothing here yet
  }

  render() {
    return (
      <div id="home-page" className="page-container container">
        <NavBar />
        <div id="bloom-title-container">
          <h1 id="home-screen-heading">Bloom</h1>
          <Link to="/tutorial">
            <button id="get-started-button" className="home-page-button" type="button">Get Started!</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
