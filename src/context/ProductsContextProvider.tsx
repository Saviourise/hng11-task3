import React, { useState, createContext } from "react";

export const ProductsContext = createContext({
  products: [],
  setProducts: null as any,
});

const ProductsContextProvider = (props: any) => {
  const [products, setProducts] = useState([]);
  return (
    <ProductsContext.Provider
      value={{
        products: products,
        setProducts: setProducts,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
export default ProductsContextProvider;
