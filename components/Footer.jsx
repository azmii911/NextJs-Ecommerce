import React from "react";
import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
  FacebookIcon,
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
function Footer() {
  return (
    <>
      <footer className="text-white body-font bg-indigo-400">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap md:text-left text-center order-first">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="text-2xl font-medium text-gray-900 tracking-widest  mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-100 text-xl hover:text-gray-800">
                    First Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-100 text-xl hover:text-gray-800">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-100 text-xl hover:text-gray-800">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-100 text-xl hover:text-gray-800">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="text-2xl font-medium text-gray-900 tracking-widest  mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-100 text-xl hover:text-gray-800">
                    First Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-100 text-xl hover:text-gray-800">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-100 text-xl hover:text-gray-800">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-100 text-xl hover:text-gray-800">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="text-2xl font-medium text-gray-900 tracking-widest  mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-100 text-xl hover:text-gray-800">
                    First Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-100 text-xl hover:text-gray-800">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-100 text-xl hover:text-gray-800">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-100 text-xl hover:text-gray-800">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="text-2xl font-medium text-gray-900 tracking-widest  mb-3">
                SUBSCRIBE
              </h2>
              <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
                <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
                  <input
                    type="text"
                    id="footer-field"
                    name="footer-field"
                    className="w-full bg-white rounded-md border border-gray-300  focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-500 rounded">
                  Button
                </button>
              </div>
              <p className="text-gray-100 text-sm mt-2 md:text-left text-center">
                Bitters chicharrones fanny pack
              </p>
            </div>
          </div>
        </div>
        <div className="bg-indigo-400 border-t border-[1px]">
          <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
            <p className="text-sm flex text-gray-500 sm:ml-6 sm:mt-0 mt-4">
              <a
                href="https://www.upwork.com/freelancers/~0198749a995f7e386e"
                rel="noopener noreferrer"
                className="text-gray-100 text-xl ml-1 flex"
                target="_blank"
              >
                © 2022 Next-Comm — develop with{" "}
                <HeartIcon
                  className="flex-shrink-0 h-6 w-6 mx-1 text-red-600 group-hover:text-red-500"
                  aria-hidden="true"
                />{" "}
                by Raheel Azmi
              </a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
              <a className="text-indigo-600">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>

              <a className="ml-3 text-indigo-600">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a className="ml-3 text-indigo-600">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  ></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
