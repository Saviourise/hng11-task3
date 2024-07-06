import React from "react";
import "../styles/CartCard.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PageContext } from "../context/PageContextProvider";

const CartCard = ({ item }: any) => {
  const [total, setTotal] = React.useState(1);
  const { setCartItems } = React.useContext(PageContext);

  const removeItem = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCart = cart.filter((cartItem: any) => cartItem.id !== item.id);
    localStorage.setItem("cart", JSON.stringify(newCart));

    setCartItems(newCart.length);
    setTotal(1);
  };

  return (
    <div className="cart-item">
      <div className="cart-content">
        <div>
          <h1>{item.title}</h1>
          <div>
            <span
              onClick={() => {
                if (total === 1) return;
                setTotal(total - 1);
              }}
            >
              -
            </span>
            <span>{total}</span>
            <span
              onClick={() => {
                setTotal(total + 1);
              }}
            >
              +
            </span>
          </div>
        </div>

        <div>
          <p>{item.description}</p>
        </div>

        <div>₦{item.price}</div>

        <div>
          <p>Total: ₦{(total * item.price).toFixed(2)}</p>
          <div onClick={removeItem}>
            <RiDeleteBin6Line size={25} color="#9137CE" />
          </div>
        </div>
      </div>
      <img className="cart-img" alt="cart" src={item.image} />
    </div>
  );
};

export default CartCard;
