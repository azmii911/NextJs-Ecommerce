/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ShoppingBagIcon,
  MenuIcon,
  XIcon,
  UserCircleIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/outline";

import { useDispatch, useSelector } from "react-redux";
import { isOpen } from "../store/cartStateSlice";
import { BASE_URL } from "../config";
import Link from "next/link";
import { isLoggedOut } from "../store/userSlice";
import Router from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav(props) {
  const [mounted, setMounted] = useState(false);

  const { categories } = props;

  const [navs, setNavs] = useState(categories);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const userInfoo = useSelector((state) => state.userInfo);

  // When mounted on client, now we can show the UI
  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <Disclosure
        as="div"
        className="bg-white border-b-[1px] py-2 border-gray-200"
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button
                    as="div"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  >
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href="/">
                      <h1 className="text-2xl font-extrabold text-indigo-600 cursor-pointer">
                        Next-Com
                      </h1>
                    </Link>
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navs?.map((item) => (
                        <Link
                          key={item.name}
                          href={`${BASE_URL}/category/${item.slug}`}
                          passHref
                        >
                          <a className="px-3 py-2 rounded-md text-md transition-all ease-in-out font-medium hover:bg-indigo-400">
                            {item.name}
                          </a>
                        </Link>
                      ))}
                      <Link href="/store">
                        <a className="px-3 py-2 rounded-md text-md transition-all ease-in-out font-medium hover:bg-indigo-400">
                          Store
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div
                    className="ml-4 flow-root lg:ml-6 cursor-pointer"
                    onClick={() => {
                      dispatch(isOpen(true));
                    }}
                  >
                    <a className="group -m-2 p-2 flex items-center">
                      <ShoppingBagIcon
                        className="flex-shrink-0 h-6 w-6 text-indigo-600 group-hover:text-indigo-500"
                        aria-hidden="true"
                      />
                      <span className=" text-sm bg-indigo-600 transition ease-linear px-2 py-[3px] rounded-full font-medium text-white group-hover:animate-pulse">
                        {cartItems?.length}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </div>

                  {/* Profile dropdown */}
                  <div>
                    {/* {userInfo ? <div>dasd</div> : <div>xyz</div>} */}
                    {userInfoo ? (
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <span className=" text-xl bg-indigo-600 transition ease-linear px-4 py-2 rounded-full font-medium text-white group-hover:animate-pulse">
                              {userInfoo?.user?.firstName
                                .charAt(0)
                                .toUpperCase()}
                            </span>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link href={`/user`} passHref>
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Your Profile
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>

                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  href=""
                                  onClick={(e) => {
                                    e.preventDefault();

                                    dispatch(isLoggedOut(null));
                                    localStorage.setItem(
                                      "userInfo",
                                      JSON.stringify(null)
                                    );
                                    Router.push("/login");
                                  }}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                  )}
                                >
                                  Sign out
                                </span>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    ) : (
                      <Link href="/login" passHref>
                        <a className="group m-2 p-2 flex items-center">
                          <UserCircleIcon
                            className="flex-shrink-0 h-8 w-8 text-indigo-600 group-hover:text-indigo-500"
                            aria-hidden="true"
                          />
                          <span className="text-md font-medium ml-1">
                            Login
                          </span>
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Disclosure.Panel as="div" className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navs.map((item) => (
                  <Link
                    key={item.slug}
                    href={`${BASE_URL}/product/${item.slug}`}
                    passHref
                  >
                    <Disclosure.Button
                      key={item.name}
                      as="div"
                      className="block px-3 py-2 rounded-md text-base font-medium"
                    >
                      {item.name}
                    </Disclosure.Button>
                  </Link>
                ))}
                <Link href="/store">
                  <Disclosure.Button
                    as="div"
                    className="block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Store
                  </Disclosure.Button>
                </Link>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
