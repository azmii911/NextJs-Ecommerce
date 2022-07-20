import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useLayoutEffect, useState } from "react";

import Link from "next/link";
import { BASE_URL } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedOut } from "../../store/userSlice";
import Router from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Navbar() {
  const dispatch = useDispatch();
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-4xl uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Analytics
          </a>
          {/* Form */}

          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <li>
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    <span className=" text-2xl bg-white transition ease-linear px-4 py-2 rounded-full font-medium text-indigo-600 group-hover:animate-pulse">
                      {/* {userInfoo?.user?.firstName.charAt(0).toUpperCase()}
                       */}
                      R
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
                        <Link href={`${BASE_URL}`} passHref>
                          <a
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Visit Website
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

                            // setUserInfoo(null);
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
            </li>
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
