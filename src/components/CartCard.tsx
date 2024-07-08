import React from "react";
import "../styles/CartCard.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PageContext } from "../context/PageContextProvider";

const CartCard = ({ item }: any) => {
  const [total, setTotal] = React.useState(item.quantity);
  const { setCartItems } = React.useContext(PageContext);

  const removeItem = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCart = cart.filter((cartItem: any) => cartItem.id !== item.id);
    localStorage.setItem("cart", JSON.stringify(newCart));

    setCartItems(newCart.length);
    setTotal(1);
  };

  React.useEffect(() => {
    const cartItems = localStorage.getItem("cart" || "[]");
    if (cartItems) {
      const parsedCart = JSON.parse(cartItems);

      // find the item in parsedcart and set the quantity to the total
      if (parsedCart) {
        const newCart = parsedCart.map((cartItem: any) =>
          cartItem.id === item.id ? { ...cartItem, quantity: total } : cartItem
        );
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
    }
  }, [total, item]);

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

        <div>
          ₦{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>

        <div>
          <p>
            Total: ₦
            {(total * item.price)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <div onClick={removeItem}>
            <RiDeleteBin6Line size={25} color="#9137CE" className="desktop" />
            <RiDeleteBin6Line size={15} color="#9137CE" className="mobile" />
          </div>
        </div>
      </div>
      <img
        className="cart-img"
        alt="cart"
        src={require("../assets/images/" + item.image)}
      />
    </div>
  );
};

export default CartCard;
