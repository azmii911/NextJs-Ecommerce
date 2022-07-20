import React, { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import db from "../utils/db";
import { wrapper } from "../store/store";
import dynamic from "next/dynamic";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import CartInnerItems from "../components/CartInnerItems";
import { isOpen } from "../store/cartStateSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { cartClear } from "../store/cartSlice";

const Layout = dynamic(() => import("../components/Layout"), {
  ssr: false,
});

function CheckoutPage(props) {
  const { categories } = props;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();
  dispatch(isOpen(false));

  const products = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.userInfo);

  const [totalItems, setTotalItems] = useState(
    products?.reduce((amount, item) => amount + item.quantity, 0)
  );
  const [totalPrice, setTotalPrice] = useState(
    products?.reduce((amount, item) => amount + item.quantity * item.price, 0)
  );
  useEffect(() => {
    if (!user) {
      Router.push("/login");
    } else if (products.length === 0) {
      Router.push("/cart");
    }
    setTotalItems(
      products?.reduce((amount, item) => amount + item.quantity, 0)
    );
    setTotalPrice(
      products?.reduce((amount, item) => amount + item.quantity * item.price, 0)
    );
  }, [products, user]);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zip, setzip] = useState("");

  const itemsPrice = products?.reduce((amount, item) => amount + item.price, 0);

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const [loading, setloading] = useState(false);

  const shippingAddress = {
    fullName: user?.user.firstName + " " + user?.user.lastName,
    address: user?.user?.address ? user?.user?.address?.address : address,
    city: user?.user?.address ? user?.user?.address?.city : city,
    zip: user?.user?.address ? user?.user?.address?.postalCode : zip,
    state: user?.user?.address ? user?.user?.address?.state : state,
    country: user?.user?.address ? user?.user?.address?.country : country,
  };

  const checkoutHadnler = async () => {
    // await setloading(true);
    try {
      setloading(true);
      const { data } = await axios.post(
        `${API_BASE_URL}/orders`,
        {
          orderItems: products,
          shippingAddress,
          paymentMethod: "COD",
          itemsPrice,
          shippingPrice,
          totalPrice: totalPrice + shippingPrice,
        },
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setloading(false);
      toast.success(`Checkout Success`, {
        position: "top-center",
        autoClose: 9000,
      });

      Router.push(`/order/${data._id}`);
      dispatch(cartClear());
    } catch (error) {
      setloading(false);
      toast.error(
        `${JSON.stringify(
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message
        )}, Can not checkout`,
        {
          position: "top-center",
          autoClose: 5000,
        }
      );
    }
  };
  return (
    <Layout categories={categories}>
      <>
        <section className="body-font relative">
          <div className="container px-5 py-24 mx-auto flex flex-col sm:flex-row">
            <div className="lg:w-full sm:w-full md:w-full bg-gray-50 rounded-lg sm:mr-10 flex items-center justify-start relative">
              <form
                action="#"
                method="POST"
                id="checkoutForm"
                className="w-full h-full"
                onSubmit={handleSubmit(checkoutHadnler)}
              >
                <div className="px-4 py-10 bg-gray-50 sm:p-10">
                  <h1 className="text-4xl pb-5 mb-5 border-b border-gray-200">
                    Billing details
                  </h1>
                  <div className="grid grid-cols-6 gap-x-6 gap-y-12">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        {...register("firstName", {
                          required: true,
                          minLength: 2,
                          maxLength: 20,
                        })}
                        type="text"
                        defaultValue={user?.user.firstName}
                        autoComplete="given-name"
                        className="mt-1 border-[1px] px-2 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 block h-full w-full shadow-sm sm:text-sm  rounded-md"
                      />
                      <p className="text-md text-red-500">
                        {errors.firstName?.type === "required" &&
                          "First Name is required"}
                        {errors.firstName?.type === "minLength" &&
                          "Min length is 2"}
                        {errors.firstName?.type === "maxLength" &&
                          "Max length is 20"}
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        {...register("lastName", {
                          required: true,
                          minLength: 2,
                          maxLength: 20,
                        })}
                        type="text"
                        defaultValue={user?.user.lastName}
                        autoComplete="family-name"
                        className="mt-1 border-[1px] px-2 focus:ring-indigo-500 focus:border-indigo-500 block h-full  w-full shadow-sm sm:text-sm border-gray-500 rounded-md"
                      />
                      <p className="text-md text-red-500">
                        {errors.lastName?.type === "required" &&
                          "Last Name is required"}
                        {errors.lastName?.type === "minLength" &&
                          "Min length is 2"}
                        {errors.lastName?.type === "maxLength" &&
                          "Max length is 20"}
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        {...register("email", {
                          required: true,
                          pattern: "[a-z0-9]+@[a-z]+.[a-z]{2,3}",
                        })}
                        type="text"
                        autoComplete="email"
                        defaultValue={user?.user.email}
                        className="mt-1  border-[1px] px-2 focus:ring-indigo-500 focus:border-indigo-500  h-full block w-full shadow-sm sm:text-sm border-gray-500 rounded-md"
                      />
                      <p className="text-md text-red-500">
                        {errors.email?.type === "required" &&
                          "Email is required"}
                        {errors.email?.type === "pattern" &&
                          "Email is not valid"}
                      </p>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <input
                        {...register("country", {
                          required: true,
                        })}
                        defaultValue={user?.user?.address?.country}
                        type="text"
                        onChange={(e) => setCountry(e.target.value)}
                        className="mt-1  border-[1px] px-2 focus:ring-indigo-500 focus:border-indigo-500 block h-full  w-full shadow-sm sm:text-sm border-gray-500 rounded-md"
                      />
                      <p className="text-md text-red-500">
                        {errors.country?.type === "required" &&
                          "country is required"}
                      </p>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street address
                      </label>
                      <input
                        {...register("address", {
                          required: true,
                        })}
                        autoComplete="on"
                        defaultValue={user?.user?.address?.address}
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        className="mt-1  border-[1px] px-2 focus:ring-indigo-500 focus:border-indigo-500 block h-full  w-full shadow-sm sm:text-sm border-gray-500 rounded-md"
                      />
                      <p className="text-md text-red-500">
                        {errors.address?.type === "required" &&
                          "address is required"}
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        {...register("city", {
                          required: true,
                        })}
                        type="text"
                        name="city"
                        defaultValue={user?.user?.address?.city}
                        onChange={(e) => setCity(e.target.value)}
                        id="city"
                        autoComplete="address-level2"
                        className="mt-1  border-[1px] px-2 focus:ring-indigo-500 focus:border-indigo-500 block h-full  w-full shadow-sm sm:text-sm border-gray-500 rounded-md"
                      />
                      <p className="text-md text-red-500">
                        {errors.city?.type === "required" && "city is required"}
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State / Province
                      </label>
                      <input
                        {...register("state", {
                          required: true,
                        })}
                        type="text"
                        defaultValue={user?.user?.address?.state}
                        onChange={(e) => setState(e.target.value)}
                        className="mt-1 border-[1px] px-2 focus:ring-indigo-500 focus:border-indigo-500 block h-full  w-full shadow-sm sm:text-sm border-gray-500 rounded-md"
                      />
                      <p className="text-md text-red-500">
                        {errors.state?.type === "required" &&
                          "state is required"}
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        ZIP / Postal code
                      </label>
                      <input
                        {...register("zip", {
                          required: true,
                        })}
                        type="text"
                        defaultValue={user?.user?.address?.postalCode}
                        onChange={(e) => setzip(e.target.value)}
                        autoComplete="postal-code"
                        className="mt-1 border-[1px] px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full  h-full shadow-sm sm:text-sm border-gray-500 rounded-md"
                      />
                      <p className="text-md text-red-500">
                        {errors.zip?.type === "required" &&
                          "zip Code is required"}
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full mt-8 md:mt-0">
              <h1 className="text-4xl py-7 px-3 bg-gray-50 border-b border-gray-200">
                Your order
              </h1>

              <CartInnerItems products={products} />
              <div>
                <div className="border-t border-gray-200 bg-gray-50 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p className="transition ease-linear">${itemsPrice}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p className="transition ease-linear">Shipping Price:</p>
                    <p className="transition ease-linear">${shippingPrice}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p className="transition ease-linear">
                      Total: ({totalItems} items)
                    </p>
                    <p className="transition ease-linear">${totalPrice}</p>
                  </div>

                  <div className="mt-6">
                    <input
                      type="submit"
                      value="Place Order"
                      form="checkoutForm"
                      className="w-full cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      // onClick={checkoutHadnler}
                    />

                    {loading ? (
                      <svg
                        role="status"
                        className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <Link href={"/"} passHref>
                        <a
                          href=""
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </a>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
}

export default CheckoutPage;

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
