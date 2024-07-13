import React, { useEffect } from "react";
import Newsletter from "../components/Newsletter";
import "../styles/Cart.css";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Products from "../components/Products";
import { LuShoppingBag } from "react-icons/lu";
import CartCard from "../components/CartCard";
import { PageContext } from "../context/PageContextProvider";
import { HashLink } from "react-router-hash-link";

const Cart = ({ products }: any) => {
  const { cartItems, setCartItems } = React.useContext(PageContext);

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    setCartItems(cartItems);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div>
            <FaTimes size={80} color="#B263E8" className="desktop" />
            <FaTimes size={20} color="#B263E8" className="mobile" />
          </div>
          <h1>Your cart is empty</h1>
          <HashLink to={"/#products-container"} className="button">
            Continue Shopping
          </HashLink>
        </div>
      ) : (
        <div className="cart-items">
          <div className="cart-header">
            <span className="cart-number">{cartItems.length}</span>
            <LuShoppingBag color="#B263E8" size={50} />
          </div>
          <div className="cart-line"></div>
          {cartItems.map((item: any, index: number) => (
            <CartCard item={item} key={index} />
          ))}
          <div className="buttons">
            <span onClick={clearCart} className="button desktop">
              Clear Cart
            </span>
            <HashLink to={"/#products-container"} className="button">
              Continue Shopping
            </HashLink>
            <Link to={"/checkout"} className="button">
              Checkout
            </Link>
          </div>

          <div className="buttons mobile">
            <span onClick={clearCart} className="button">
              Clear Cart
            </span>
          </div>
        </div>
      )}

      <Products
        numOfproducts={3}
        products={products}
        title={"Recently Viewed Items"}
      />
      <div className="line"></div>
      <Products
        numOfproducts={7}
        startNumOfproducts={4}
        products={products}
        title={"Hot on the List"}
      />
      <div className="line"></div>
      <Newsletter />
    </>
  );
};

export default Cart;
