import React from "react";
import "../styles/CheckoutCard.css";

const CheckoutCard = ({ setTotalPrice, item }: any) => {
  const [total, setTotal] = React.useState(item.quantity);

  React.useEffect(() => {
    const cartItemsStorage = localStorage.getItem("cart" || "[]");
    if (cartItemsStorage) {
      const parsedCart = JSON.parse(cartItemsStorage);
      if (parsedCart) {
        const newCart = parsedCart.map((cartItem: any) =>
          cartItem.id === item.id ? { ...cartItem, quantity: total } : cartItem
        );
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
    }

    setTotalPrice(
      JSON.parse(localStorage.getItem("cart") || "[]").reduce(
        (acc: any, item: any) => acc + item.price * item.quantity,
        0
      )
    );
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
          <h2>{item.title}</h2>
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
        <p>₦{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
      </div>

      <img src={require("../assets/images/" + item.image)} alt={item.title} />
    </div>
  );
};

export default CheckoutCard;
