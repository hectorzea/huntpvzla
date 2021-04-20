import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Layout } from "../components/layout/layout";
import { useRouter } from "next/router";
import useProducts from "../hooks/useProducts";
import ProductDetail from "../components/layout/ProductDetail";
export default () => {
  const [result, setResult] = useState([]);
  const router = useRouter();
  const {
    query: { q },
  } = router;

  const { products } = useProducts("created_at");
  useEffect(() => {
    const search = q.toLowerCase();
    const filtered = products.filter((p) => {
      return (
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    });
    setResult(filtered);
  }, [q, products]);
  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {result.map((product) => (
                <ProductDetail key={product.id} product={product} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};
