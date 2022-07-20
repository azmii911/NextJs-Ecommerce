import React from "react";
import Store from "../components/Store";
import { API_BASE_URL } from "../config";
import db from "../utils/db";
import { wrapper } from "../store/store";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/Layout"), {
  ssr: false,
});

function store({ products, categories }) {
  return (
    <div>
      <Layout categories={categories}>
        <Store products={products} categories={categories} />
      </Layout>
    </div>
  );
}

export default store;
export async function getServerSideProps() {
  // All products API
  const productRes = await fetch(API_BASE_URL + "/products");
  const products = await productRes.json();

  // All Categories API
  const categoriesRes = await fetch(API_BASE_URL + "/categories");
  const categories = await categoriesRes.json();

  return {
    props: {
      products: products.map(db.convertDocToObj),
      categories: categories.map(db.convertDocToObj),
    },
  };
}
