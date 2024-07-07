import React from "react";
import "../styles/Footer.css";
import logo_white from "../assets/images/logo_white.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <img src={logo_white} alt="logo" />

      <div className="section1">
        <h1>Company</h1>
        <p>About</p>
        <p>Our Stores</p>
        <p>Bulk orders</p>
        <p>Product testing</p>
        <p>Terms and conditions</p>
        <p>Affliate marketing</p>
      </div>
    </div>
  );
};

export default Footer;
