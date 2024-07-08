import React from "react";
import Card from "./Card";
import "../styles/Products.css";

const Products = ({
  products,
  title,
  startNumOfproducts,
  numOfproducts,
}: any) => {
  const clickCategory = (index: any) => {
    const categories = document.querySelectorAll(".category");
    categories.forEach((category: any, ind) => {
      if (ind === index - 1) {
        category.classList.add("active");
      } else {
        category.classList.remove("active");
      }
    });
  };
  return (
    <div className="products-container">
      {title && <div className="titleDiv">{title}</div>}
      {!title && (
        <>
          <div className="firstDiv desktop">
            <p>
              <span>Home</span>
              <span>/</span>
              <span>Fashion</span>
              <span>/</span>
              <span>Wedding</span>
              <span>/</span>
              <span>Gowns</span>
            </p>
          </div>

          <div className="firstDiv mobile">
            <p>Wedding Wear</p>
          </div>
        </>
      )}
      {!title && <div className="secondDiv">Wedding Wears</div>}
      {!title && (
        <div className="thirdDiv">
          <p
            onClick={() => {
              clickCategory(1);
            }}
            className="category"
          >
            Men
          </p>
          <p
            onClick={() => {
              clickCategory(2);
            }}
            className="category active"
          >
            Women
          </p>
          <p
            onClick={() => {
              clickCategory(3);
            }}
            className="category"
          >
            Wedding Wears
          </p>
        </div>
      )}
      <div className="card-container desktop">
        {products
          .slice(startNumOfproducts || 0, numOfproducts || products.length)
          .map((product: any) => {
            return <Card key={product.id} product={product} />;
          })}
      </div>

      <div className="card-container mobile">
        {products
          .slice(startNumOfproducts || 0, numOfproducts - 1 || products.length)
          .map((product: any) => {
            return <Card key={product.id} product={product} />;
          })}
      </div>
    </div>
  );
};

export default Products;
