import React from "react";
import "../styles/Card.css";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { PageContext } from "../context/PageContextProvider";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

const Card = ({ product }: any) => {
  const { setCartItems } = React.useContext(PageContext);
  const cartBtn = React.useRef<any>(null);
  const wishListBtn = React.useRef<any>(null);
  const [isInWishlist, setIsInWishlist] = React.useState(false);

  const addToCart = (product: any) => {
    cartBtn?.current?.classList.add("bounce");

    setTimeout(() => {
      cartBtn?.current?.classList.remove("bounce");
    }, 1000);

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // check if item is in cart
    const isInCart = cart.find((item: any) => item.id === product.id);
    if (isInCart) {
      // remove item from cart
      const newCart = cart.filter((item: any) => item.id !== product.id);
      setCartItems(newCart.length);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return;
    }

    const newCart = [...cart, product];
    setCartItems(newCart.length);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToWishlist = (product: any) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    wishListBtn?.current?.classList.add("bounce");

    setTimeout(() => {
      wishListBtn?.current?.classList.remove("bounce");
    }, 1000);

    // check if item is in wishlist
    const isInWishlist = wishlist.find((item: any) => item.id === product.id);
    if (isInWishlist) {
      // remove item from wishlist
      const newWishlist = wishlist.filter(
        (item: any) => item.id !== product.id
      );
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      checkWishlist();
      return;
    }

    const newWishlist = [...wishlist, product];
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    checkWishlist();
  };

  const checkcart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const isInCart = cart.find((item: any) => item.id === product.id);
    if (isInCart) {
      return true;
    } else {
      return false;
    }
  };

  const checkWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isInWishlist = wishlist.find((item: any) => item.id === product.id);
    if (isInWishlist) {
      return setIsInWishlist(true);
    } else {
      return setIsInWishlist(false);
    }
  };

  React.useEffect(() => {
    checkWishlist();
  }, []);

  return (
    <div className="card-inner-container">
      <div className="card">
        <div
          className="wishlist"
          onClick={() => {
            addToWishlist(product);
          }}
          ref={wishListBtn}
        >
          {isInWishlist ? (
            <IoIosHeart color="red" />
          ) : (
            <IoIosHeartEmpty color="red" />
          )}
        </div>
        <img src={product.image} alt="Product Image" />
        <div className="card-content">
          <p className="flex title">
            <span>{product.title}</span>
            <span>-{Math.floor(product.rating.count / 10)}%</span>
          </p>
          <p className="price">₦{product.price}</p>
          <p className="description">{product.description}</p>
          <p className="flex">
            <span className="rating">
              {[...Array(Math.floor(product.rating.rate))].map((_page, i) => {
                return <FaStar color="#FFAC33" key={i} />;
              })}
              {[...Array(5 - Math.floor(product.rating.rate))].map(
                (_page, i) => {
                  return <CiStar color="#FFAC33" key={i} />;
                }
              )}
            </span>
            <span
              className="add-to-cart"
              onClick={() => {
                addToCart(product);
              }}
              ref={cartBtn}
            >
              <IoCartOutline size={20} />
              <span>
                {!checkcart(product) ? "Add to Cart" : "Remove from Cart"}
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
