import React from "react";
import "../styles/Card.css";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { PageContext } from "../context/PageContextProvider";
import { Link } from "react-router-dom";

const Card = ({ product }: any) => {
  const { setCartItems, cartItems } = React.useContext(PageContext);
  const cartBtn = React.useRef<any>(null);

  const addToCart = (product: any) => {
    cartBtn?.current?.classList.add("bounce");

    setTimeout(() => {
      cartBtn?.current?.classList.remove("bounce");
    }, 1000);

    // check if item is in cart
    const isInCart = cartItems.find((item: any) => item.id === product.id);
    if (isInCart) {
      // remove item from cart
      const newCart = cartItems.filter((item: any) => item.id !== product.id);
      setCartItems(newCart);
      return;
    }

    const newCart = [...cartItems, { ...product, quantity: 1 }];
    setCartItems(newCart);
  };

  const checkcart = (product: any) => {
    const isInCart = cartItems.find((item: any) => item.id === product.id);
    if (isInCart) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="card-inner-container">
      <div className="card">
        <Link to={`/product/${product.id}`}>
          <img
            src={`https://api.timbu.cloud/images/${product.photos[0].url}`}
            alt="Product"
          />
        </Link>
        <div className="card-content">
          <Link to={`/product/${product.id}`}>
            <p className="flex title">
              <span>{product.name}</span>
              <span>
                -
                {Math.floor(
                  (product.current_price[0].NGN[1] /
                    product.current_price[0].NGN[0]) *
                    100
                )}
                %
              </span>
            </p>
            <p className="price">
              ₦
              {product.current_price[0].NGN[0]
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <p className="description">{product.description}</p>
          </Link>
          <p className="flex">
            <span className="rating desktop">
              {[...Array(product.rating)].map((_page, i) => {
                return (
                  <FaStar
                    color="#FFAC33"
                    key={i}
                    size={15}
                    className="desktop"
                  />
                );
              })}
              {[...Array(5 - product.rating)].map((_page, i) => {
                return (
                  <CiStar
                    color="#FFAC33"
                    key={i}
                    size={15}
                    className="desktop"
                  />
                );
              })}
            </span>
            <span
              title={`${product.available_quantity} in stock`}
              className={`add-to-cart ${
                product.available_quantity === 0 ? "disabled" : ""
              }`}
              onClick={() => {
                if (product.available_quantity > 0) {
                  addToCart(product);
                }
              }}
              ref={cartBtn}
            >
              <IoCartOutline size={20} className="desktop" />
              <IoCartOutline size={15} className="mobile" />
              <span>
                {product.available_quantity === 0 ? (
                  "Out of stock"
                ) : (
                  <>
                    {!checkcart(product) ? "Add to Cart" : "Remove from Cart"}
                  </>
                )}
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
