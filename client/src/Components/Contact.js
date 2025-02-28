import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-section">
      <h3>Contact Us</h3>
      <p><strong>Ashraf's Restaurant</strong></p>
      <p>124 Busby Road</p>
      <p>Clarkston, Glasgow</p>
      <p>G76 8BG</p>
      <p>Phone: 0141 644 4800</p>
      <p>Email: hello@ashrafs.co.uk</p>
      <p>Operating Hours:</p>
      <p>Monday-Saturday: 16:00 - 22:00</p>
      <div className="social-media">
        <h4>Follow Us</h4>
        <ul>
          <li><a href="https://www.facebook.com/thehungryspoon" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://www.instagram.com/thehungryspoon" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
