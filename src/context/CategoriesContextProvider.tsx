import React, { useState, createContext } from "react";

export const CategoriesContext = createContext({
  categories: [],
  setCategories: null as any,
  activeCategory: 0,
  setActiveCategory: null as any,
});

const CategoriesContextProvider = (props: any) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <CategoriesContext.Provider
      value={{
        categories: categories,
        setCategories: setCategories,
        activeCategory: activeCategory,
        setActiveCategory: setActiveCategory,
      }}
    >
      {props.children}
    </CategoriesContext.Provider>
  );
};
export default CategoriesContextProvider;
