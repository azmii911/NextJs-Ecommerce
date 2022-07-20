import { TicketIcon } from "@heroicons/react/outline";
import { CheckCircleIcon, SelectorIcon } from "@heroicons/react/solid";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminLayout from "../../../components/admin/AdminLayout";
import { API_BASE_URL } from "../../../config";
import Order from "../../../models/OrderModel";
import db from "../../../utils/db";
import { OrderDetailScreen } from "../../order/[id]";

function EditOrder({ order }) {
  const [allsummary, setAllsummary] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getSummary = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/admin/summary`);
        setloading(false);
        setAllsummary(data);
      } catch (error) {
        setloading(false);
        toast.error(
          `${JSON.stringify(
            error.response && error.response.data && error.response.data.message
              ? error.response.data.message
              : error.message
          )}`
        );
      }
    };

    getSummary();
  }, []);

  const colors = {
    bgFalse: "bg-red-200 text-red-500",
    bgTrue: "bg-green-100 text-green-500",
  };
  const editOrderHandler = async (id) => {
    try {
      const { data } = await axios.put(`${API_BASE_URL}/orders/editOrder`, {
        id: order?._id,
        isDeliverd: true,
      });
      if (data) {
        toast.success(JSON.stringify(data.message));
        Router.push("./");
      }
    } catch (error) {
      toast.error(
        `${JSON.stringify(
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message
        )}`
      );
    }
  };
  return (
    <div>
      <AdminLayout allsummary={allsummary} loading={loading}>
        <>
          <ol role="list" className="max-w-2xl  flex space-x-2 lg:max-w-7xl">
            <li>
              <div className="flex ">
                <Link
                  href="/admin/dashboard"
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  Dashboard
                </Link>
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-4 h-5 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li>
              <div className="flex">
                <Link
                  href="/admin/orders"
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  Orders
                </Link>
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-4 h-5 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li>
              <div className="flex">
                <p className="mr-2 text-sm font-medium text-gray-900">
                  {order._id}
                </p>
              </div>
            </li>
          </ol>
          <h1 className="text-4xl py-5">
            Edit Order
            <span className="bg-gray-100 rounded-md p-2 mx-5">
              {order._id}
            </span>{" "}
            <span
              className={
                " p-3 rounded-md ext-md font-semibold  " +
                (order?.isDeliverd.toString() !== "false"
                  ? `${colors.bgTrue}`
                  : `${colors.bgFalse}`)
              }
            >
              {order?.isDeliverd.toString() === "false"
                ? "⌛ Not Delivered"
                : "✔️ Delivered"}
            </span>
          </h1>
        </>
        <OrderDetailScreen order={order}>
          {order?.isDeliverd.toString() === "false" ? (
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                editOrderHandler(order._id);
              }}
              className="flex items-center space-x-2 text-center bg-indigo-600 border border-transparent rounded-md py-2 px-4 font-medium text-white hover:bg-indigo-700"
            >
              <CheckCircleIcon className="h-5 w-5 block" />
              <h1>Mark as Delivered</h1>
            </button>
          ) : (
            ""
          )}
        </OrderDetailScreen>
      </AdminLayout>
    </div>
  );
}

export default EditOrder;
export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  await db.connect();
  const orderr = await Order.findOne({ _id: id }).lean();
  const order = JSON.parse(JSON.stringify(orderr));
  await db.disconnect();

  return {
    props: {
      order: db.convertDocToObj(order),
    },
  };
}
