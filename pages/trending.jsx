import React, { useEffect, useState, useContext } from "react";
import { Layout } from "../components/layout/layout";
import ProductDetail from "../components/layout/ProductDetail";
import useProducts from "../hooks/useProducts";

const Trending = () => {
  const { products } = useProducts("votes");
  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {products.map((product) => (
                <ProductDetail key={product.id} product={product} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Trending;
