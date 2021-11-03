import React, { useState } from "react";

export const ProductsContext = React.createContext<{
  products: Product[];
  setProducts?: any;
}>({ products: [] });

export const ProductsContextComponent: React.FC<{}> = (props) => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
