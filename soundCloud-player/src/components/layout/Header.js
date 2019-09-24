import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-light pb50">
    <Link to="/" className="navbar-brand main-logo">Dashboard</Link>
    <ul className="nav navbar-nav">
      <li className="nav-item" key={1}>
        <Link to="/login" className="nav-link">Log in</Link>
      </li>
      <li className="nav-item" key={2}>
        <Link to="/signup" className="nav-link">Sign up</Link>
      </li>
    </ul>
  </nav>
);

export default Header;
