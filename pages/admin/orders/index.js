import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Charts from "../../../components/admin/Charts";
import axios from "axios";
import { BASE_URL, API_BASE_URL } from "../../../config";
import Table, {
  AvatarCell,
  SelectColumnFilter,
  StatusPill,
} from "../../../components/admin/Table";
const AdminLayout = dynamic(
  () => import("../../../components/admin/AdminLayout"),
  {
    ssr: false,
  }
);

import db from "../../../utils/db";
import Link from "next/link";
import { PencilAltIcon, PencilIcon } from "@heroicons/react/solid";

function Orders({ allOrders }) {
  const btn = (id) => {
    return (
      <Link href={`${BASE_URL}/admin/orders/${id}`}>
        <button className="flex items-center space-x-2 text-center bg-indigo-600 border border-transparent rounded-md py-2 px-4 font-medium text-white hover:bg-indigo-700">
          <PencilIcon className="h-5 w-5 block" />
          <h1>Edit</h1>
        </button>
      </Link>
    );
  };
  const getData = () => {
    const data = allOrders?.map((orders, i) => ({
      orderid: orders._id,
      date: orders.createdAt.slice(0, 13),
      c_name: orders.shippingAddress.fullName,
      action: btn(orders._id),
      paymentMethod: orders.paymentMethod,
      total: `$${orders.totalPrice}`,
      status:
        orders.isDeliverd.toString() === "false"
          ? "Not Delivered"
          : "Delivered",
    }));
    return [...data];
  };
  const columns = useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "orderid",
      },
      {
        Header: "Date",
        accessor: "date",
      },

      {
        Header: "Customer Name",
        accessor: "c_name",
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
      },
      {
        Header: "Order Amount",
        accessor: "total",
      },

      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );

  const data = useMemo(() => getData(), []);
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
  return (
    <>
      <AdminLayout allsummary={allsummary} loading={loading}>
        <div className="">
          <h1 className="text-4xl font-semibold">Recent Orders</h1>
        </div>
        <div className="mt-6">
          <Table columns={columns} data={data} />
        </div>
      </AdminLayout>
    </>
  );
}

export default Orders;

export async function getServerSideProps() {
  const orderRes = await fetch(API_BASE_URL + "/orders/allorders");
  const allOrders = await orderRes.json();
  return {
    props: {
      allOrders: allOrders.map(db.convertDocToObj),
    },
  };
}
