import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./styles/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import PageContextProvider from "./context/PageContextProvider";
import Cart from "./pages/Cart";
import ScrollToTop from "./helpers/scrollToTop";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import CategoriesContextProvider from "./context/CategoriesContextProvider";
import ToastMessageProvider from "./context/ToastMessage";
import ProductsContextProvider from "./context/ProductsContextProvider";
import Product from "./pages/Product";

function App() {
  return (
    <ToastMessageProvider>
      <ProductsContextProvider>
        <CategoriesContextProvider>
          <PageContextProvider>
            <Router>
              <ScrollToTop />
              <ToastContainer position="bottom-right" />
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/product/:id" element={<Product />} />

                <Route path="*" element={<h1>404 Page Not Found</h1>} />
              </Routes>
              <Footer />
            </Router>
          </PageContextProvider>
        </CategoriesContextProvider>
      </ProductsContextProvider>
    </ToastMessageProvider>
  );
}

export default App;
