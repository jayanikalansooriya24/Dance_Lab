// src/Components/Navbar/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo .png';
import './navbar.css';


const Navbar = () => {
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

  
      </ul>
    </nav>
  );
};

export default Navbar;
