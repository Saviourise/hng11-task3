import React from "react";
import "../styles/Checkout.css";
import CheckoutCard from "../components/CheckoutCard";
import Newsletter from "../components/Newsletter";
import mastercard from "../assets/images/logos_mastercard.png";
import visa from "../assets/images/logos_visaelectron.png";
import { CiCreditCard1 } from "react-icons/ci";
import { PageContext } from "../context/PageContextProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cartItems, setCartItems } = React.useContext(PageContext);
  const [deliveryFee, setDeliveryFee] = React.useState(5000);

  const [inputData, setInputData] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
    promoCode: "",
  });

  const applyPromoCode = () => {
    if (inputData.promoCode) {
      setDeliveryFee(0);
      Swal.fire({
        title: "Promo Code Applied",
        text: "Delivery is now free",
        icon: "success",
      });
      setInputData({ ...inputData, promoCode: "" });
    }
  };

  const [total, setTotal] = React.useState(0);

  const saveData = () => {
    const { name, email, phone, address, country } = inputData;

    if (!name || !email || !phone || !address || !country) {
      toast.error("Please fill all the fields");
      return false;
    }

    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!regex.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }

    const regex2 = /^[0-9]{10,15}$/;

    if (!regex2.test(phone)) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    toast.success("Data saved successfully");
  };

  const validateInputData = () => {
    const { name, email, phone, address, country, cardNumber, expDate, cvv } =
      inputData;

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !country ||
      !cardNumber ||
      !expDate ||
      !cvv
    ) {
      toast.error("Please fill all the fields");
      return false;
    }

    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!regex.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }

    const regex2 = /^[0-9]{10,15}$/;

    if (!regex2.test(phone)) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    return true;
  };

  const pay = () => {
    // check if cart is empty

    if (!cartItems.length) {
      toast.error("Your cart is empty");
      return;
    }

    // validate input data
    const isValid = validateInputData();

    if (!isValid) {
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You want to place the order",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9137ce",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, place order",
    })
      .then((isConfirm) => {
        // check if cancel button is clicked

        console.log(isConfirm);

        if (!isConfirm.isConfirmed) {
          return Swal.fire({
            title: "Payment Cancelled",
            text: "Payment was cancelled by user and could not be completed",
            icon: "error",
          });
        }

        let timerInterval: any;
        Swal.fire({
          title: "Making Payment, please wait...",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            Swal.fire({
              title: `Hello ${inputData.name}`,
              text: "Your order has been placed successfully, and will be delivered to you soon",
              icon: "success",
            });

            //reset input data
            setInputData({
              name: "",
              email: "",
              phone: "",
              address: "",
              country: "",
              cardNumber: "",
              expDate: "",
              cvv: "",
              promoCode: "",
            });
            //reset cart items
            setCartItems([]);
          } else {
            Swal.fire({
              title: "Payment Cancelled",
              text: "Payment was cancelled by user and could not be completed",

              icon: "error",
            });
          }
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Payment Cancelled",
          text: "Payment was cancelled by user and could not be completed",

          icon: "error",
        });
      });
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        Information {">"} Shipping {">"} Checkout
      </div>

      <div className="checkout-inner-container">
        <div className="checkout-card-container">
          <h1>Order Summary</h1>
          {cartItems.map((item: any, index: number) => {
            return (
              <CheckoutCard setTotalPrice={setTotal} item={item} key={index} />
            );
          })}

          <div className="checkout-promo-code">
            <input
              type="text"
              placeholder="Enter gift card or Discount code"
              value={inputData.promoCode}
              onChange={(e) => {
                setInputData({
                  ...inputData,
                  promoCode: e.target.value,
                });
              }}
            />
            <span className="button" onClick={applyPromoCode}>
              <span>Apply</span>
            </span>
          </div>

          <div className="line"></div>

          <div className="subtotal-container">
            <div>
              <p>Sub-total</p>
              <p>
                ₦
                {total
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
            <div>
              <p>Delivery</p>
              <p>
                ₦
                {deliveryFee
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
          </div>

          <div className="line"></div>

          <div className="total-container">
            <p>Total</p>
            <p>
              ₦
              {(total + deliveryFee)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          </div>
        </div>

        <div className="checkout-form-container">
          <h1>Shipping address</h1>
          <div className="input-div">
            <label htmlFor="">Country/Region</label>
            <select
              name="country"
              id="country"
              value={inputData.country}
              onChange={(e) => {
                setInputData({
                  ...inputData,
                  country: e.target.value,
                });
              }}
            >
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Nigeria">Nigeria</option>
            </select>
          </div>

          <div className="input-div">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Full Name"
              value={inputData.name}
              onChange={(e) => {
                setInputData({
                  ...inputData,
                  name: e.target.value,
                });
              }}
            />
          </div>

          <div className="input-div">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email Address"
              value={inputData.email}
              onChange={(e) => {
                setInputData({
                  ...inputData,
                  email: e.target.value,
                });
              }}
            />
          </div>

          <div className="input-div">
            <label htmlFor="">Address</label>
            <input
              type="text"
              placeholder="Enter Delivery Address"
              value={inputData.address}
              onChange={(e) => {
                setInputData({
                  ...inputData,
                  address: e.target.value,
                });
              }}
            />
          </div>

          <div className="input-div">
            <label htmlFor="">Phone Number (Optional)</label>
            <input
              type="number"
              placeholder="Enter Phone Number"
              value={inputData.phone}
              onChange={(e) => {
                setInputData({
                  ...inputData,
                  phone: e.target.value,
                });
              }}
            />
          </div>

          <div className="save-btn" onClick={saveData}>
            <span>Save</span>
          </div>

          <h1>Payment Details</h1>
          <div className="input-div">
            <label htmlFor="">Card Information</label>
            <div className="card-num">
              <input
                type="number"
                placeholder="1234 1234 1234 1234"
                value={inputData.cardNumber}
                data-grouplength="4"
                onChange={(e) => {
                  if (e.target.value.toString().length === 20) return;
                  setInputData({
                    ...inputData,
                    cardNumber: e.target.value,
                  });
                }}
              />
              <img src={mastercard} alt="mastercard" />
              <img src={visa} alt="visa" />
            </div>
            <div className="cvv">
              <input
                type="month"
                placeholder="MM/YY"
                value={inputData.expDate}
                onChange={(e) => {
                  setInputData({
                    ...inputData,
                    expDate: e.target.value,
                  });
                }}
              />
              <div>
                <input
                  type="number"
                  placeholder="CVC"
                  value={inputData.cvv}
                  onChange={(e) => {
                    if (e.target.value.toString().length === 4) return;
                    setInputData({
                      ...inputData,
                      cvv: e.target.value,
                    });
                  }}
                />
                <CiCreditCard1 size={20} color="#827789" className="icon" />
              </div>
            </div>
          </div>

          <div className="checkbox">
            <input type="checkbox" id="terms" name="terms" checked />
            <label htmlFor="terms">
              Billing Address same as shiping adress
            </label>
          </div>

          <div className="pay-btn" onClick={pay}>
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
