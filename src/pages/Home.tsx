import React from "react";
import "../styles/Home.css";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <Products />
      <Newsletter />
    </>
  );
};

export default Home;
