import dynamic from "next/dynamic";
import React from "react";
import Footer from "./Footer";
import HeaderBanner from "./HeaderBanner";
import Nav from "./Nav";

const Cart = dynamic(() => import("./Cart"), {
  ssr: false,
});
function Layout(props) {
  const { categories } = props;
  return (
    <>
      {/* <HeaderBanner heading="Big news! We are excited to announce a brand new product." /> */}
      <Nav categories={categories} />
      {props.children}
      <Footer />
      <Cart />
    </>
  );
}

export default Layout;
