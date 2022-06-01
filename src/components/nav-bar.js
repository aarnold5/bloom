import React from 'react';

function NavBar(props) {
  return (
    <nav>
      <ul>
        <li>
          <a href="auth">
            <button id="login-button" className="home-page-button" type="button">Login</button>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
