import React from "react";
import "../styles/Home.css";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";

const Home = ({ products }: any) => {
  return (
    <>
      <Hero />
      <Products products={products} />
      <Newsletter />
    </>
  );
};

export default Home;
