import React, { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Sidebar from "./Sidebar";
import Router from "next/router";
const Layout = dynamic(() => import("./Layout"), {
  ssr: false,
});

function UserDashLayout(props) {
  const { categories } = props;
  const userInfo = useSelector((state) => state.userInfo);
  useEffect(() => {
    if (!userInfo) {
      Router.push("/login");
    }
  }, []);

  if (!userInfo) {
    return <></>;
  }
  return (
    <>
      <Layout categories={categories}>
        <div className="bg-gray-100 py-10 mx-5 md:mx-auto px-5 md:px-1">
          <div className="container mx-auto md:mx-auto">
            <div className="bg-white shadow-sm py-10 my-5 rounded-md px-10">
              <h1 className="text-4xl pb-2 font-bold">
                Howdy, {userInfo?.user?.firstName}
              </h1>
              <h1 className="text-xl py-3 text-gray-600">
                From your account dashboard you can view your recent orders,
                manage your shipping and billing addresses, and edit your
                password and account details.
              </h1>
            </div>
            <Sidebar>
              <div className=" py-10 md:py-0 w-full md:w-4/5 md:mx-auto">
                <div className="w-full h-full rounded bg-white shadow-sm p-5">
                  {props.children}
                </div>
              </div>
            </Sidebar>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default UserDashLayout;
