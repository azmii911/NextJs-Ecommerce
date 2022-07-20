import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import {
  LogoutIcon,
  MenuAlt2Icon,
  UserGroupIcon,
  ShoppingCartIcon,
  ChartSquareBarIcon,
  UserCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { isLoggedOut } from "../../store/userSlice";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white z-50 m-2 py-3 px-6")}
          >
            <MenuAlt2Icon className="w-10 h-10 bg-gray-400 rounded-sm p-2 text-indigo-900  hover:text-indigo-800" />
          </button>
          {/* Brand */}

          <p
            href="#pablo"
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-xl uppercase font-bold p-4 px-0"
          >
            Admin Panel
          </p>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              {/* <NotificationDropdown /> */}
            </li>
            <li className="inline-block relative">{/* <UserDropdown /> */}</li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch  md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-50 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/">
                    <a
                      href="#"
                      className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-xl uppercase font-bold p-4 px-0"
                    >
                      Admin Panel
                    </a>
                  </Link>
                </div>

                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}

            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="my-2 text-gray-600">
                <Link href="/admin/dashboard">
                  <button
                    className={
                      " flex flex-row-reverse justify-end items-center text-xl font-semibold rounded-md  p-2 w-full shadow-sm" +
                      (router.pathname.indexOf("/admin/dashboard") !== -1
                        ? " bg-indigo-100 text-indigo-600"
                        : "text-gray-600 ")
                    }
                  >
                    Dashboard
                    <ChartSquareBarIcon className="w-10 h-10 rounded-sm p-2 text-indigo-600 " />
                  </button>
                </Link>
              </li>
              <li className="my-2 text-gray-600">
                <Link href="/admin/users">
                  <button
                    className={
                      " flex flex-row-reverse justify-end items-center text-xl font-semibold  rounded-md  p-2 w-full shadow-sm" +
                      (router.pathname.indexOf("/admin/users") !== -1
                        ? " bg-indigo-100 text-indigo-600"
                        : "text-gray-600")
                    }
                  >
                    Users
                    <UserGroupIcon className="w-10 h-10 rounded-sm p-2 text-indigo-600 " />
                  </button>
                </Link>
              </li>
              <li className="my-2 text-gray-600">
                <Link href="/admin/products">
                  <button
                    className={
                      " flex flex-row-reverse justify-end items-center text-xl font-semibold  rounded-md  p-2 w-full shadow-sm" +
                      (router.pathname.indexOf("/admin/products") !== -1
                        ? " bg-indigo-100 text-indigo-600"
                        : "text-gray-600")
                    }
                  >
                    Products
                    <ShoppingCartIcon className="w-10 h-10 rounded-sm p-2  text-indigo-600" />
                  </button>
                </Link>
              </li>
              <li className="my-2 text-gray-600">
                <Link href="/admin/categories">
                  <button
                    className={
                      " flex flex-row-reverse justify-end items-center text-xl font-semibold  rounded-md  p-2 w-full shadow-sm" +
                      (router.pathname.indexOf("/admin/categories") !== -1
                        ? " bg-indigo-100 text-indigo-600"
                        : "text-gray-600")
                    }
                  >
                    Categories
                    <ShoppingCartIcon className="w-10 h-10 rounded-sm p-2  text-indigo-600" />
                  </button>
                </Link>
              </li>

              <li className="my-2 text-gray-600">
                <Link href="/admin/orders">
                  <button
                    className={
                      " flex flex-row-reverse justify-end items-center text-xl font-semibold  rounded-md  p-2 w-full shadow-sm" +
                      (router.pathname.indexOf("/admin/orders") !== -1
                        ? " bg-indigo-100 text-indigo-600"
                        : "text-gray-600")
                    }
                  >
                    Orders
                    <ShoppingBagIcon className="w-10 h-10 rounded-sm p-2  text-indigo-600 " />
                  </button>
                </Link>
              </li>
              <li className="my-2 text-gray-600">
                <Link href="/admin/dashboard">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(isLoggedOut(null));
                      localStorage.setItem("userInfo", JSON.stringify(null));

                      router.push("/login");
                    }}
                    className="flex flex-row-reverse justify-end items-center text-xl text-gray-600 font-semibold rounded-md   p-2 w-full shadow-sm"
                  >
                    Logout
                    <LogoutIcon className="w-10 h-10 rounded-sm p-2  text-indigo-600 " />
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
