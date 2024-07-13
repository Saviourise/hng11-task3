import React, { useState, createContext } from "react";

export const PageContext = createContext({
  cartItems: [],
  setCartItems: null as any,
});

const PageContextProvider = (props: any) => {
  const [cartItems, setCartItems] = useState([]);
  return (
    <PageContext.Provider
      value={{
        cartItems: cartItems,
        setCartItems: setCartItems,
      }}
    >
      {props.children}
    </PageContext.Provider>
  );
};
export default PageContextProvider;
