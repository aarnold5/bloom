/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import HomePage from './components/pages/home-page';
import TutorialPage from './components/pages/tutorial-page';
// import LoginPage from './components/pages/login-page';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="tutorial" element={<TutorialPage />} />
          <Route path="auth" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
