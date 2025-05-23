import React from 'react';
import './Footer.css'; // optional if you want to style it separately

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Inventory Manager • Built by Arun</p>
    </footer>
  );
};

export default Footer;