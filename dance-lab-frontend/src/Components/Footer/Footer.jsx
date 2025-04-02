// src/Components/Footer/Footer.jsx

import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Dance Lab. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
