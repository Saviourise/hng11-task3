import React from "react";
import Card from "./Card";
import "../styles/Products.css";
import { ProductsContext } from "../context/ProductsContextProvider";
import { CategoriesContext } from "../context/CategoriesContextProvider";
import { getProducts } from "../helpers/servies";
import Loader from "./Loader";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Products = ({ title, startNumOfproducts, numOfproducts }: any) => {
  const { products, setProducts }: any = React.useContext(ProductsContext);
  const { categories, activeCategory, setActiveCategory }: any =
    React.useContext(CategoriesContext);

  const [error, setError] = React.useState<string | boolean>(false);
  // const [loadingCategories, setLoadingCategories] = React.useState(false);
  const [loadingProducts, setLoadingProducts] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState("");
  const [productsPagination, setProductsPagination] = React.useState<{
    page: number;
    pages: number;
    next: string | null;
    prev: string | null;
  }>({
    page: 1,
    pages: 1,
    next: null,
    prev: null,
  });

  const getAllProducts = async (page: number) => {
    setLoadingProducts(true);
    setLoadingText("Fetching Products");

    try {
      const products = await getProducts({
        size: 12,
        page: page,
      });

      if (products.error) {
        return setError("An error occurred while fetching products");
      }

      const proPagination = {
        page: products.page,
        next: products.next_page,
        prev: products.previous_page,
        pages: Math.ceil(products.total / products.size),
      };

      setProductsPagination(proPagination);

      const allProducts = products.items;

      allProducts.map((product: any) => {
        const desRat = JSON.parse(product.description);
        product.description = desRat.description;
        product.rating = desRat.rating;
        return null;
      });

      setProducts(allProducts);
    } catch (error: any) {
      setError("An error occurred while fetching products");
    } finally {
      setLoadingProducts(false);
    }
  };

  React.useEffect(() => {
    getAllProducts(1);

    return;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, activeCategory]);

  if (error) {
    return (
      <div className="products-container" id="products-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          <h2>{error}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="products-container" id="products-container">
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
              <span>{categories[activeCategory]}</span>
            </p>
          </div>

          <div className="firstDiv mobile">
            <p>{categories[activeCategory]}</p>
          </div>
        </>
      )}
      {!title && <div className="secondDiv">{categories[activeCategory]}</div>}
      {!title && (
        <div className="thirdDiv">
          {categories?.length > 0 &&
            categories.map((category: string, index: number) => {
              return (
                <p
                  key={index}
                  onClick={() => {
                    setActiveCategory(index);
                  }}
                  className={`category ${
                    activeCategory === index ? "active" : ""
                  }`}
                >
                  {category}
                </p>
              );
            })}
        </div>
      )}

      {loadingProducts ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            flexDirection: "column",
            gap: 50,
          }}
        >
          <Loader />
          <h3>{loadingText}</h3>
        </div>
      ) : (
        <>
          <div className="card-container desktop">
            {products
              .slice(startNumOfproducts || 0, numOfproducts || products.length)
              .map((product: any) => {
                return <Card key={product.id} product={product} />;
              })}
          </div>

          <div className="card-container mobile">
            {products
              .slice(
                startNumOfproducts || 0,
                numOfproducts - 1 || products.length
              )
              .map((product: any) => {
                return <Card key={product.id} product={product} />;
              })}
          </div>
        </>
      )}

      <div className="pagination-container">
        <span
          className={`button prevNext ${
            !productsPagination.prev ? "disabled" : ""
          } `}
          id="prev"
          onClick={() => {
            getAllProducts(productsPagination.page - 1);
          }}
        >
          <FaAngleLeft />
        </span>

        <div className="links">
          {[...Array(productsPagination.pages)].map((_page, i) => {
            return (
              <span
                className={`link ${
                  i + 1 === productsPagination.page ? "active" : ""
                }`}
                onClick={() => {
                  getAllProducts(i + 1);
                }}
              >
                {i + 1}
              </span>
            );
          })}
        </div>

        <span
          className={`button prevNext ${
            !productsPagination.next ? "disabled" : ""
          } `}
          id="next"
          onClick={() => {
            getAllProducts(productsPagination.page + 1);
          }}
        >
          <FaAngleRight />
        </span>
      </div>
    </div>
  );
};

export default Products;
