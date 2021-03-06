import React from "react";
import { Layout } from "../components/layout/layout";
import ProductDetail from "../components/layout/ProductDetail";
import useProducts from "../hooks/useProducts";
const HomeComponent = () => {
  const { products } = useProducts("created_at");
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

export default HomeComponent;
