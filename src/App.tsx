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
import products from "./helpers/products.json";
import Footer from "./components/Footer";

function App() {
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
        <Footer />
      </Router>
    </PageContextProvider>
  );
}

export default App;
