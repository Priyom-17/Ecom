import React from 'react';
import Layout from '../components/Layout/Layout';

import { FaEnvelope, FaPhone } from 'react-icons/fa';

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className='row contactus' style={{ backgroundColor: '#87CEEB', color: 'white', minHeight: '100vh' }}>
        <div className='col-md-6'>
          <h1>Contact</h1>
          <img src='/images/contact us.jpeg' alt="contactus" style={{ width: "100%" }} />
        </div>
        <div className='col-md-4 d-flex flex-column justify-content-center align-items-center'>
          <h2 style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'white', fontSize: '3rem' }}>Get in Touch</h2>
          <p style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'white', fontSize: '2rem' }}>
            <FaEnvelope /> Email: priyom85@gmail.com
          </p>
          <p style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'white', fontSize: '2rem' }}>
            <FaPhone /> Phone: 01831456807
          </p>
          <p style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'white', fontSize: '2rem' }}>
            Address: Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
