import React from 'react';
import Layout from '../components/Layout/Layout';
import './Policy.css';

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="policy-container">
        <h1 className="policy-title">Privacy Policy</h1>

        <section className="policy-section">
          <h2>Introduction</h2>
          <p>
            Welcome to our Privacy Policy page. Your privacy is critically important to us. This
            policy outlines the types of information we collect and how we use, disclose, and protect it.
          </p>
        </section>

        <section className="policy-section">
          <h2>Information We Collect</h2>
          <p>
            We collect various types of information to provide and improve our service to you, such as:
          </p>
          <ul>
            <li>Personal Data (e.g., name, email address)</li>
            <li>Usage Data (e.g., IP address, browser type, pages visited)</li>
            <li>Cookies and Tracking Technologies</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect for various purposes, including:
          </p>
          <ul>
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To analyze usage and improve our platform</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Your Data Protection Rights</h2>
          <p>
            You have certain rights regarding your personal data, including:
          </p>
          <ul>
            <li>The right to access, update, or delete your data</li>
            <li>The right to rectification of inaccurate data</li>
            <li>The right to withdraw consent</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul>
            <li>Email: priyom85@gmail.com</li>
            <li>Phone:  01831456807</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}

export default Policy;
