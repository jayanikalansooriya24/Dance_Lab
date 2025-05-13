import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo .png';
import './navbar.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Dance Lab Logo" className="logo-img" />
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/eventsview">Events</Link></li>
        <li><Link to="/login">Login</Link></li>
      

        <li
          className="dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <span className="dropdown-toggle">Services ▾</span>
          {showDropdown && (
            <ul className="dropdown-menu">
              <li><Link to="/collab">Dance Challenge Collaboration</Link></li>
              <li><Link to="/mycollab">View Collaberations</Link></li>
              <li><Link to="/videolist">Dance Routine Creation and Sharing</Link></li>
              <li><Link to="/videoupload">Upload Dance Routine</Link></li>
              <li><Link to="/analysis">Admin </Link></li>
              <li><Link to="/dashboard">Dance Schedulling Analysis </Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

