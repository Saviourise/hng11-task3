import React from "react";
import Newsletter from "../components/Newsletter";
import "../styles/Cart.css";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Products from "../components/Products";
import { LuShoppingBag } from "react-icons/lu";
import CartCard from "../components/CartCard";
import { PageContext } from "../context/PageContextProvider";

const Cart = ({ products }: any) => {
  const [cart, setCart] = React.useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const { cartItems } = React.useContext(PageContext);

  React.useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, [cartItems]);

  return (
    <>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <div>
            <FaTimes size={80} color="#B263E8" />
          </div>
          <h1>Your cart is empty</h1>
          <Link to={"/"} className="button">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-items">
          <div className="cart-header">
            <span className="cart-number">{cartItems}</span>
            <LuShoppingBag color="#B263E8" size={50} />
          </div>
          <div className="cart-line"></div>
          {cart.map((item: any, index: number) => (
            <CartCard item={item} key={index} />
          ))}
          <div className="buttons">
            <Link to={"/"} className="button">
              Continue Shopping
            </Link>
            <Link to={"/checkout"} className="button">
              Checkout
            </Link>
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
