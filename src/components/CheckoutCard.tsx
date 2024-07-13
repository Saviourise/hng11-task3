import React from "react";
import "../styles/CheckoutCard.css";
import { PageContext } from "../context/PageContextProvider";
import { Link } from "react-router-dom";

const CheckoutCard = ({ setTotalPrice, item }: any) => {
  const [total, setTotal] = React.useState(item.quantity);
  const { cartItems, setCartItems } = React.useContext(PageContext);

  const getItemPrice = (item: any) => {
    // check if variable is an array
    if (Array.isArray(item.current_price)) {
      return item.current_price[0].NGN[0];
    } else {
      return item.current_price;
    }
  };

  React.useEffect(() => {
    if (cartItems.length) {
      const newCart = cartItems.map((cartItem: any) =>
        cartItem.id === item.id ? { ...cartItem, quantity: total } : cartItem
      );
      setCartItems(newCart);
    }

    setTotalPrice(
      cartItems.reduce(
        (acc: any, item: any) => acc + getItemPrice(item) * item.quantity,
        0
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, setTotalPrice, item]);

  if (!item) {
    return (
      <div className="checkout-card">
        <div className="checkout-content">
          <div>
            <h2>No Item</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-card">
      <div className="checkout-content">
        <div>
          <Link to={`/product/${item.id}`}>
            <h2>{item.name}</h2>
          </Link>
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
        <Link to={`/product/${item.id}`}>
          <p>
            ₦
            {getItemPrice(item)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </Link>
      </div>

      <Link to={`/product/${item.id}`}>
        <img
          src={`https://api.timbu.cloud/images/${item.photos[0].url}`}
          alt={item.title}
        />
      </Link>
    </div>
  );
};

export default CheckoutCard;
