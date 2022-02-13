import React, { Component } from 'react';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}; // nothing here yet
  }

  render() {
    return (
      <div id="login-page" className="page-container container">
        LOGIN PAGE
        <div className="container vertical-container">
          <h1>Login</h1>
          <form>
            <label htmlFor="username">
              Username:
              <input type="text" id="username" name="username" />
            </label>
            <label htmlFor="pwd">
              Password:
              <input type="password" id="pwd" name="pwd" />
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
