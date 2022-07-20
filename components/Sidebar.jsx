import React from "react";
import {
  UserCircleIcon,
  ChartSquareBarIcon,
  LogoutIcon,
  ShoppingBagIcon,
} from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedOut } from "../store/userSlice";
import Router from "next/router";
import Link from "next/link";
function Sidebar(props) {
  const dipatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar starts */}
      {/* Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] */}
      <div className="w-full md:w-64 bg-white shadow md:h-full justify-between flex flex-col">
        <div className="px-8">
          <ul className="my-10">
            <Link href={`/user`}>
              <li className="flex w-full justify-between hover:text-gray-500 cursor-pointer   items-center border-b-2 py-4">
                <div className="flex items-center">
                  <ChartSquareBarIcon
                    className="flex-shrink-0 h-8 w-8 text-indigo-600 group-hover:text-indigo-500"
                    aria-hidden="true"
                  />
                  <span className="text-xl  ml-2">Dashboard</span>
                </div>
              </li>
            </Link>
            <Link href={"/user/account"}>
              <li className="flex w-full justify-between hover:text-gray-500 cursor-pointer  items-center border-b-2 py-4">
                <div className="flex items-center">
                  <UserCircleIcon
                    className="flex-shrink-0 h-8 w-8 text-indigo-600 group-hover:text-indigo-500"
                    aria-hidden="true"
                  />
                  <span className="text-xl  ml-2">Account Settings</span>
                </div>
              </li>
            </Link>
            <Link href={"/user/orders"}>
              <li className="flex w-full justify-between hover:text-gray-500 cursor-pointer  items-center border-b-2 py-4">
                <div className="flex items-center">
                  <ShoppingBagIcon
                    className="flex-shrink-0 h-8 w-8 text-indigo-600 group-hover:text-indigo-500"
                    aria-hidden="true"
                  />
                  <span className="text-xl  ml-2">Order Details</span>
                </div>
              </li>
            </Link>
            <li
              onClick={(e) => {
                dipatch(isLoggedOut(null));
                Router.push("/");
              }}
              className="flex w-full justify-between hover:text-gray-500 cursor-pointer  items-center border-b-2 py-4"
            >
              <div className="flex items-center">
                <LogoutIcon
                  className="flex-shrink-0 h-8 w-8 text-indigo-600 group-hover:text-indigo-500"
                  aria-hidden="true"
                />
                <span className="text-xl  ml-2">Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Sidebar ends */}
      {/* Remove class [ h-64 ] when adding a card block */}
      {props.children}
    </div>
  );
}

export default Sidebar;
