import React from "react";
import "../styles/CartCard.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PageContext } from "../context/PageContextProvider";
import { Link } from "react-router-dom";

const CartCard = ({ item }: any) => {
  const [total, setTotal] = React.useState(item.quantity);
  const { setCartItems, cartItems } = React.useContext(PageContext);

  const removeItem = () => {
    const newCart = cartItems.filter(
      (cartItem: any) => cartItem.id !== item.id
    );

    setCartItems(newCart);
    setTotal(1);
  };

  const increaseQuantity = (quantity: number) => {
    setTotal(quantity);
    const newCart = cartItems.map((cartItem: any) =>
      cartItem.id === item.id ? { ...cartItem, quantity: quantity } : cartItem
    );

    setCartItems(newCart);
  };

  const decreaseQuantity = (quantity: number) => {
    setTotal(quantity);
    const newCart = cartItems.map((cartItem: any) =>
      cartItem.id === item.id ? { ...cartItem, quantity: quantity } : cartItem
    );

    setCartItems(newCart);
  };

  React.useEffect(() => {
    if (cartItems.length) {
      const newCart = cartItems.map((cartItem: any) =>
        cartItem.id === item.id ? { ...cartItem, quantity: total } : cartItem
      );
      setCartItems(newCart);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const setItemDescription = () => {
    try {
      return JSON.parse(item.description).description;
    } catch {
      return item.description;
    }
  };

  const getItemPrice = () => {
    // check if variable is an array
    if (Array.isArray(item.current_price)) {
      return item.current_price[0].NGN[0];
    } else {
      return item.current_price;
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-content">
        <div>
          <Link to={`/product/${item.id}`}>
            <h1>{item.name}</h1>
          </Link>
          <div>
            <span
              onClick={() => {
                if (total === 1) return;
                decreaseQuantity(total - 1);
              }}
            >
              -
            </span>
            <span>{total}</span>
            <span
              onClick={() => {
                increaseQuantity(total + 1);
              }}
            >
              +
            </span>
          </div>
        </div>

        <Link to={`/product/${item.id}`}>
          <div>
            <p>{setItemDescription()}</p>
          </div>

          <div>
            ₦
            {getItemPrice()
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        </Link>

        <div>
          <Link to={`/product/${item.id}`}>
            Total: ₦
            {(total * getItemPrice())
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Link>
          <div onClick={removeItem}>
            <RiDeleteBin6Line size={25} color="#9137CE" className="desktop" />
            <RiDeleteBin6Line size={15} color="#9137CE" className="mobile" />
          </div>
        </div>
      </div>
      <Link to={`/product/${item.id}`} className="cart-img-container">
        <img
          className="cart-img"
          alt="cart"
          src={`https://api.timbu.cloud/images/${item.photos[0].url}`}
        />
      </Link>
    </div>
  );
};

export default CartCard;
