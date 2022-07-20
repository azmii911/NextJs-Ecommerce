import { LockClosedIcon } from "@heroicons/react/solid";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import Router from "next/router";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../config";
import { isLogged } from "../store/userSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function SignUp({ ip }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const signUpHAndler = async ({ firstName, lastName, email, password }) => {
    try {
      const responseData = await axios.post(`${API_BASE_URL}/users/signup`, {
        firstName,
        lastName,
        email,
        password,
        ip,
      });
      if (responseData) {
        localStorage.setItem("userInfo", JSON.stringify(responseData.data));
        dispatch(isLogged(responseData.data));
        Router.push("/");
        setError("");
      }
    } catch (error) {
      // setError(JSON.stringify(error.response.data.message));
      toast.error(
        `${JSON.stringify(error.response.data.message)}, Authentication Failed`,
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };
  const userInfo = useSelector((state) => state.userInfo);
  useLayoutEffect(() => {
    if (userInfo) {
      Router.push("/");
    }
  }, []);
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your Account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(signUpHAndler)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="first-name" className="sr-only">
                  First name
                </label>
                <input
                  {...register("firstName", {
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                  })}
                  type="text"
                  className="appearance-none rounded-none mb-5 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                />{" "}
                <p className="text-md text-red-500">
                  {errors.firstName?.type === "required" &&
                    "First Name is required"}
                  {errors.firstName?.type === "minLength" && "Min length is 2"}
                  {errors.firstName?.type === "maxLength" && "Max length is 20"}
                </p>
              </div>
              <div>
                <label htmlFor="last-name" className="sr-only">
                  Last name
                </label>
                <input
                  {...register("lastName", {
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                  })}
                  type="text"
                  className="appearance-none rounded-none mb-5 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                />
                <p className="text-md text-red-500">
                  {errors.lastName?.type === "required" &&
                    "Last Name is required"}
                  {errors.lastName?.type === "minLength" && "Min length is 2"}
                  {errors.lastName?.type === "maxLength" && "Max length is 20"}
                </p>
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  {...register("email", {
                    required: true,
                    pattern: "[a-z0-9]+@[a-z]+.[a-z]{2,3}",
                  })}
                  type="email"
                  autoComplete="email"
                  className="appearance-none rounded-none relative mb-5 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                <p className="text-md text-red-500">
                  {errors.email?.type === "required" && "Email is required"}
                  {errors.email?.type === "pattern" && "Email is not valid"}
                </p>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 5,
                    maxLength: 20,
                  })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none rounded-none mb-5 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />{" "}
                <p className="text-md text-red-500">
                  {errors.password?.type === "required" &&
                    "Password  is required"}
                  {errors.password?.type === "minLength" &&
                    "Password must be greater then 4 digits"}
                  {errors.password?.type === "maxLength" &&
                    "Password must be less then 20 digits"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href="/login" passHref>
                  <a
                    href=""
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Already have an account?
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Create Account
              </button>
            </div>
            <p className="text-md text-red-500">{error}</p>
          </form>
        </div>
      </div>
    </>
  );
}
