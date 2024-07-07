import React from "react";
import "../styles/Checkout.css";
import CheckoutCard from "../components/CheckoutCard";
import Newsletter from "../components/Newsletter";
import mastercard from "../assets/images/logos_mastercard.png";
import visa from "../assets/images/logos_visaelectron.png";
import { CiCreditCard1 } from "react-icons/ci";

const Checkout = () => {
  const [cart] = React.useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  const [total] = React.useState(
    JSON.parse(localStorage.getItem("cart") || "[]").reduce(
      (acc: any, item: any) => acc + item.price,
      0
    )
  );

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        Information {">"} Shipping {">"} Checkout
      </div>

      <div className="checkout-inner-container">
        <div className="checkout-card-container">
          <h1>Order Summary</h1>
          {cart.map((item: any) => {
            return <CheckoutCard item={item} />;
          })}

          <div className="checkout-promo-code">
            <input type="text" placeholder="Enter gift card or Discount code" />
            <span className="button">
              <span>Apply</span>
            </span>
          </div>

          <div className="line"></div>

          <div className="subtotal-container">
            <div>
              <p>Sub-total</p>
              <p>₦{total.toFixed(2)}</p>
            </div>
            <div>
              <p>Delivery</p>
              <p>₦5.00</p>
            </div>
          </div>

          <div className="line"></div>

          <div className="total-container">
            <p>Total</p>
            <p>₦{total.toFixed(2)}</p>
          </div>
        </div>

        <div className="checkout-form-container">
          <h1>Shipping address</h1>
          <div className="input-div">
            <label htmlFor="">Country/Region</label>
            <select name="country" id="country">
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Nigeria">Nigeria</option>
            </select>
          </div>

          <div className="input-div">
            <label htmlFor="">Name</label>
            <input type="text" placeholder="Enter Full Name" />
          </div>

          <div className="input-div">
            <label htmlFor="">Email</label>
            <input type="email" placeholder="Enter Email Address" />
          </div>

          <div className="input-div">
            <label htmlFor="">Address</label>
            <input type="text" placeholder="Enter Delivery Address" />
          </div>

          <div className="input-div">
            <label htmlFor="">Phone Number (Optional)</label>
            <input type="number" placeholder="Enter Phone Number" />
          </div>

          <div className="save-btn">
            <span>Save</span>
          </div>

          <h1>Payment Details</h1>
          <div className="input-div">
            <label htmlFor="">Card Information</label>
            <div className="card-num">
              <input type="number" placeholder="1234 1234 1234 1234" />
              <img src={mastercard} alt="mastercard" />
              <img src={visa} alt="visa" />
            </div>
            <div className="cvv">
              <input type="number" placeholder="MM/YY" />
              <div>
                <input type="number" placeholder="CVC" />
                <CiCreditCard1 size={20} color="#827789" className="icon" />
              </div>
            </div>
          </div>

          <div className="checkbox">
            <input type="checkbox" id="terms" name="terms" />
            <label htmlFor="terms">
              Billing Address same as shiping adress
            </label>
          </div>

          <div className="pay-btn">
            <span>Pay Now</span>
          </div>
        </div>
      </div>

      <div className="big-line"></div>

      <Newsletter />
    </div>
  );
};

export default Checkout;
