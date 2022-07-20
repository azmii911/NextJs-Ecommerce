import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartInnerItems from "../components/CartInnerItems";
import { API_BASE_URL } from "../config";
import { isOpen } from "../store/cartStateSlice";
import { wrapper } from "../store/store";
import db from "../utils/db";
const Layout = dynamic(() => import("../components/Layout"), {
  ssr: false,
});

function Cart(props) {
  const { categories } = props;
  const dispatch = useDispatch();
  dispatch(isOpen(false));
  const products = useSelector((state) => state.cart.cartItems);

  if (products.length === 0) {
    return (
      <>
        <Layout categories={categories}>
          <div className="py-20">
            <h1 className="text-2xl text-center py-5">
              No products in the cart.
            </h1>
            <div className="bg-center w-4/12 mx-auto my-10">
              <div className="rounded-md shadow">
                <Link href="/store">
                  <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                    {"<-- Back to Store"}
                  </a>
                </Link>
              </div>
            </div>
            <div className="bg-center w-4/12 mx-auto my-10">
              <div className="rounded-md shadow"></div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
  return (
    <Layout categories={categories}>
      <div>
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <CartInnerItems products={products} />
            <div className="w-6/12  mt-20 bg-gray-50 py-6 px-4 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p className="transition ease-linear">
                  ${products?.reduce((amount, item) => amount + item.price, 0)}
                </p>
              </div>

              <div className="flex justify-between text-base font-medium text-gray-900">
                <p className="transition ease-linear">
                  Total -{" "}
                  {products?.reduce(
                    (amount, item) => amount + item.quantity,
                    0
                  )}{" "}
                  items
                </p>
                <p className="transition ease-linear">
                  $
                  {products?.reduce(
                    (amount, item) => amount + item.quantity * item.price,
                    0
                  )}
                </p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link href="/checkout" passHref>
                  <a
                    href=""
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Checkout
                  </a>
                </Link>
              </div>

              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <Link href={"/"} passHref>
                    <a
                      href=""
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      // onClick={async (e) => {
                      //   e.stopPropagation();
                      //   e.preventDefault();
                      //    dispatch(isOpen(!cartReduxtState));
                      // }}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default Cart;

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
