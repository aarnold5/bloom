import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import * as auth from '../../services/auth';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}; // nothing here yet
  }

  render() {
    return (
      <div id="login-page" className="page-container container">
        <div className="container vertical-container login-container">
          <h1>Login</h1>
          <form className="container vertical-container">
            <label htmlFor="username">
              Username:
              <input type="text" id="username" name="username" />
            </label>
            <label htmlFor="pwd">
              Password:
              <input type="password" id="pwd" name="pwd" />
            </label>
          </form>
          <button id="get-started-button" className="home-page-button" type="button" onClick={auth.getAuthKey()}>Login With Spotify</button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
