import React from "react";
import "../styles/CheckoutCard.css";

const CheckoutCard = ({ item }: any) => {
  return (
    <div className="checkout-card">
      <div className="checkout-content">
        <div>
          <h2>{item.title}</h2>
          <div>
            <span>-</span>
            <span>1</span>
            <span>+</span>
          </div>
        </div>
        <p>₦{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
      </div>

      <img src={require("../assets/images/" + item.image)} alt={item.title} />
    </div>
  );
};

export default CheckoutCard;
