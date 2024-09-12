import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import your CSS file

const Footer = () => {
  return (
    <div className='bg-dark text-light p-3'>
      <h1 className='text-center'>
        Explore the latest, experience the best!
      </h1>
      <p className='text-center mt-3'>
        <Link to="/about" className='footer-link'> About </Link>|
        <Link to="/contact" className='footer-link'> Contact </Link>|
        <Link to="/policy" className='footer-link'> Policy </Link>
      </p>
    </div>
  );
}

export default Footer;
