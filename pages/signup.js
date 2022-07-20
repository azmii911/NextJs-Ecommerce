import React from "react";
import SignUp from "../components/SignUp";
import { API_BASE_URL } from "../config";
import db from "../utils/db";
import { wrapper } from "../store/store";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/Layout"), {
  ssr: false,
});

function Signup(props) {
  const { ip, categories } = props;
  return (
    <Layout categories={categories}>
      <SignUp ip={ip} />;
    </Layout>
  );
}

export default Signup;

export async function getServerSideProps(context) {
  let ip;

  const { req } = context;

  if (req.headers["x-forwarded-for"]) {
    ip = req.headers["x-forwarded-for"].split(",")[0];
  } else if (req.headers["x-real-ip"]) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }
  const categoriesRes = await fetch(API_BASE_URL + "/categories");
  const categories = await categoriesRes.json();
  console.log(ip);
  return {
    props: {
      ip,
      categories: categories.map(db.convertDocToObj),
    },
  };
}
