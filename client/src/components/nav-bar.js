import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(props) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">
            <button id="login-button" className="home-page-button" type="button">Login</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
