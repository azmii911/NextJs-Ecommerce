import React from "react";
import Login from "../components/Login";
import { API_BASE_URL } from "../config";
import db from "../utils/db";
import { wrapper } from "../store/store";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/Layout"), {
  ssr: false,
});

function LoginPage(props) {
  const { categories } = props;

  return (
    <Layout categories={categories}>
      <Login />
    </Layout>
  );
}

export default LoginPage;
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    // All Categories API
    const categoriesRes = await fetch(API_BASE_URL + "/categories");
    const categories = await categoriesRes.json();

    return {
      props: {
        categories: categories.map(db.convertDocToObj),
      },
    };
  }
);
