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
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/classes">Classes</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/eventsview">Events</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login">Login</Link></li>

        <li
          className="dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <span className="dropdown-toggle">Services ▾</span>
          {showDropdown && (
            <ul className="dropdown-menu">
              <li><Link to="/services/dance-challenge">Dance Challenge Collaboration</Link></li>
              <li><Link to="/services/routine-sharing">Dance Routine Creation and Sharing</Link></li>
              <li><Link to="/services/routine-sharing">Dance Schedulling Analysis and Feedback </Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

