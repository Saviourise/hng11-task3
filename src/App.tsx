import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./styles/index.css";
import React from "react";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import PageContextProvider from "./context/PageContextProvider";
import Cart from "./pages/Cart";
import ScrollToTop from "./helpers/scrollToTop";
import Checkout from "./pages/Checkout";

interface Product {
  category: string;
  description: string;
  id: string | number;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  title: string;
}

function App() {
  const [products, setProducts] = React.useState<Array<Product> | null>(null);

  React.useEffect(() => {
    const getProducts = localStorage.getItem("products");

    if (getProducts) {
      setProducts(JSON.parse(getProducts));
      return;
    }

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        localStorage.setItem("products", JSON.stringify(data));
        console.log(data);
      })
      .catch((err) => {
        setProducts([]);
      });

    return;
  }, []);

  return (
    <PageContextProvider>
      <Router>
        <ScrollToTop />
        <ToastContainer />
        <Header />
        <Routes>
          <Route
            path="/"
            element={products ? <Home products={products} /> : <Loader />}
          />
          <Route
            path="/cart"
            element={products ? <Cart products={products} /> : <Loader />}
          />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </Router>
    </PageContextProvider>
  );
}

export default App;
