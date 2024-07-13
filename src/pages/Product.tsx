import React from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../helpers/servies";
import Loader from "../components/Loader";
import "../styles/Product.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import Products from "../components/Products";
import { PageContext } from "../context/PageContextProvider";

const Product = () => {
  const productId = useParams().id || "";
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | boolean>(false);
  const [product, setProduct] = React.useState<any>({});

  const [thumbSwiper, setThumbSwiper] = React.useState<any>(null);
  const [quantity, setQuantity] = React.useState(1);

  const { setCartItems, cartItems } = React.useContext(PageContext);

  const addToCart = (product: any) => {
    // check if item is in cart
    const isInCart = checkcart(product);
    if (isInCart) {
      // remove item from cart
      const newCart = cartItems.filter((item: any) => item.id !== product.id);
      setCartItems(newCart);
      return;
    }

    const newCart = [...cartItems, { ...product, quantity: quantity }];
    setCartItems(newCart);
  };

  const checkcart = (product: any) => {
    const isInCart = cartItems.find((item: any) => item.id === product.id);
    if (isInCart) {
      return true;
    } else {
      return false;
    }
  };

  const getSingleProduct = async () => {
    setLoading(true);

    try {
      const product = await getProduct(productId);

      if (product.error) {
        return setError("An error occurred while fetching product");
      }

      if (checkcart(product)) {
        const item = cartItems.find(
          (item: any) => item.id === product.id
        ) as any;
        if (item) {
          product.quantity = item.quantity;
          setQuantity(item.quantity);
        } else {
          product.quantity = 1;
          setQuantity(1);
        }
      } else {
        product.quantity = 1;
        setQuantity(1);
      }

      setProduct(product);
    } catch (error: any) {
      setError("An error occurred while fetching product");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getSingleProduct();

    return;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="product-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
            flexDirection: "column",
            gap: 50,
          }}
        >
          <h2>{error}</h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="product-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
            flexDirection: "column",
            gap: 50,
          }}
        >
          <Loader />
          <h3>Fetching Product...</h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="product-container">
        <section>
          <div>
            <Swiper
              style={
                {
                  "--swiper-navigation-color": "#fff",
                } as React.CSSProperties
              }
              spaceBetween={10}
              navigation={true}
              thumbs={{
                swiper:
                  thumbSwiper && !thumbSwiper.destroyed ? thumbSwiper : null,
              }}
              modules={[Autoplay, Navigation, Thumbs, FreeMode]}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              className="mySwiper2"
            >
              {product.photos.map((image: any) => (
                <SwiperSlide key={image.id}>
                  <img
                    src={`https://api.timbu.cloud/images/${image.url}`}
                    alt="Product"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail */}

            <Swiper
              onSwiper={setThumbSwiper}
              spaceBetween={10}
              slidesPerView={5}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[Navigation, Thumbs, FreeMode]}
              className="mySwiper"
            >
              {product.photos.map((image: any) => (
                <SwiperSlide key={image.id}>
                  <img
                    src={`https://api.timbu.cloud/images/${image.url}`}
                    alt="Product"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div>
            <h1>{product.name}</h1>

            <p className="flex">
              <span className="ratings">
                {[...Array(Number(product.extra_infos[0].value))].map(
                  (_page, i) => {
                    return <FaStar color="#FFAC33" key={i} size={20} />;
                  }
                )}
                {[...Array(5 - Number(product.extra_infos[0].value))].map(
                  (_page, i) => {
                    return <CiStar color="#FFAC33" key={i} size={20} />;
                  }
                )}
              </span>
              <span>({Number(product.extra_infos[0].value).toFixed(1)})</span>
            </p>

            <div className="flex">
              <h1 className="price">
                ₦
                {product.current_price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </h1>
              <p className="discount">
                ₦
                {(product.discounted_price + product.current_price)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>

            <hr />

            <h4>About the product</h4>
            <p>{JSON.parse(product.description).description}</p>

            <hr />

            {product.available_quantity > 0 ? (
              <p>
                <b>{product.available_quantity}</b> units left
              </p>
            ) : (
              <p className="red">Out of stock</p>
            )}

            <div className="flex">
              <span className="quantity">
                <span
                  onClick={() => {
                    if (
                      product.quantity > 1 &&
                      product.available_quantity > 0
                    ) {
                      setQuantity(quantity - 1);
                    }
                  }}
                >
                  -
                </span>
                <span>{quantity}</span>
                <span
                  onClick={() => {
                    if (
                      product.available_quantity > 0 &&
                      quantity < product.available_quantity
                    ) {
                      setQuantity(quantity + 1);
                    }
                  }}
                >
                  +
                </span>
              </span>

              <span
                className={`add-to-cart ${
                  product.available_quantity <= 0 ? "disabled" : ""
                }`}
                onClick={() => {
                  if (product.available_quantity > 0) {
                    addToCart(product);
                  }
                }}
              >
                {!checkcart(product) ? "Add to Cart" : "Remove from Cart"}
              </span>
            </div>
          </div>
        </section>
      </div>

      <hr />

      <Products numOfproducts={6} title={"Related Products"} />
    </>
  );
};

export default Product;
