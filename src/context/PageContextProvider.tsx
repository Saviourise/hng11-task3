import React, { useState, createContext } from "react";

export const PageContext = createContext({
  cartItems: 0,
  setCartItems: null as any,
});

const PageContextProvider = (props: any) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")?.length || 0
  );
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
