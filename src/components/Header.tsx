import React from "react";
import "../styles/Header.css";
import logo from "../assets/images/logo.png";
import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { PageContext } from "../context/PageContextProvider";

const Header = () => {
  const { cartItems } = React.useContext(PageContext);

  return (
    <header className="header-container">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="search-bar">
        <IoIosSearch color="#B263E8" size={20} className="searchIcon" />
        <input type="text" name="search" id="search" placeholder="Search" />
        <IoFilterOutline color="#B263E8" size={20} className="filterIcon" />
      </div>

      <div className="icons">
        <Link to={"/"} className="link">
          Products
        </Link>
        <Link to={"/"} className="link">
          Contact Us
        </Link>
        <Link to={"/cart"} className="link">
          <span>{cartItems}</span>
          Cart
        </Link>
      </div>
    </header>
  );
};

export default Header;
