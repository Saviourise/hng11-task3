import React from "react";
import "../styles/Footer.css";
import logo_white from "../assets/images/logo_white.png";
import { SlSocialFacebook } from "react-icons/sl";
import { HiOutlineMail } from "react-icons/hi";
import { FaInstagram } from "react-icons/fa6";
import { FaSnapchat } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footer-container">
      <img src={logo_white} alt="logo" />

      <div>
        <div className="section1">
          <p>About Us</p>
          <p>Blog</p>
          <p>FAQs</p>
          <p>Order Tracking</p>
          <p>Contact</p>
          <p>©Legacy jnr</p>
        </div>

        <div className="section2">
          <FaSnapchat color="#fff" size={20} />
          <FaInstagram color="#fff" size={20} />
          <HiOutlineMail color="#fff" size={20} />
          <SlSocialFacebook color="#fff" size={20} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
