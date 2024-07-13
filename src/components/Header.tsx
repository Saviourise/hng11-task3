import React from "react";
import "../styles/Header.css";
import logo from "../assets/images/logo.png";
import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { PageContext } from "../context/PageContextProvider";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaBars } from "react-icons/fa6";
import { HashLink } from "react-router-hash-link";
import { LiaTimesSolid } from "react-icons/lia";

const Header = () => {
  const { cartItems } = React.useContext(PageContext);
  const [isSideNavOpen, setIsSideNavOpen] = React.useState(false);

  // detect route change and close side nav every time the route changes
  const location = useLocation();

  React.useEffect(() => {
    closeSideNav();
  }, [location]);

  const closeSideNav = () => {
    const sideNav: any = document.getElementById("mobile-header");
    sideNav.style.transform = "translateY(-100%)";
    setIsSideNavOpen(false);
  };

  const openSideNav = () => {
    const sideNav: any = document.getElementById("mobile-header");
    sideNav.style.transform = "translateY(0%)";
    setIsSideNavOpen(true);
  };

  return (
    <>
      <header className="header-container">
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="phone cart-icon">
          <Link to={"/cart"} className="link">
            <span className="cart-number">{cartItems.length}</span>
            <MdOutlineShoppingCart color="#9137CE" size={25} />
          </Link>
        </div>

        <div className="phone under-container">
          {isSideNavOpen ? (
            <LiaTimesSolid color="#767479" onClick={closeSideNav} size={20} />
          ) : (
            <FaBars color="#767479" size={20} onClick={openSideNav} />
          )}

          <div className="search-bar">
            <IoIosSearch color="#B263E8" size={20} className="searchIcon" />
            <input type="text" name="search" id="search" placeholder="Search" />
            <IoFilterOutline color="#B263E8" size={20} className="filterIcon" />
          </div>
        </div>

        <div className="search-bar desktop">
          <IoIosSearch color="#B263E8" size={20} className="searchIcon" />
          <input type="text" name="search" id="search" placeholder="Search" />
          <IoFilterOutline color="#B263E8" size={20} className="filterIcon" />
        </div>

        <div className="icons">
          <HashLink to={"/#products-container"} className="link">
            Products
          </HashLink>
          <HashLink to={"/#newsletter-container"} className="link">
            Contact Us
          </HashLink>
          <Link to={"/cart"} className="link">
            <span className="cart-number" style={{ right: -15 }}>
              {cartItems.length}
            </span>
            Cart
          </Link>
        </div>
      </header>

      <div className="mobile-header" id="mobile-header">
        <HashLink to={"/#products-container"} className="link">
          Products
        </HashLink>
        <HashLink to={"/#newsletter-container"} className="link">
          Contact Us
        </HashLink>
        <Link to={"/cart"} className="link">
          Cart
        </Link>
      </div>
    </>
  );
};

export default Header;
