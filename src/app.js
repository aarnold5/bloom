/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import HomePage from './components/home-page';
// import TutorialPage from './components/tutorial-page';
// import NavBar from './components/nav-bar';

class App extends Component {
  render() {
    return (
      <div>
        {/* <TutorialPage /> */}
        <HomePage />
      </div>
    );
  }
}

export default App;
