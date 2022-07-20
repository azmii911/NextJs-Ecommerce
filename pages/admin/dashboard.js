import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Charts from "../../components/admin/Charts";
import axios from "axios";

import Table, {
  AvatarCell,
  SelectColumnFilter,
  StatusPill,
} from "../../components/admin/Table";
import { API_BASE_URL } from "../../config";
const AdminLayout = dynamic(
  () => import("../../components/admin/AdminLayout"),
  {
    ssr: false,
  }
);

import db from "../../utils/db";

function Dashboard({ allOrders }) {
  const getData = () => {
    const data = allOrders?.map((orders, i) => ({
      orderid: orders._id,
      date: orders.createdAt.slice(0, 13),
      c_name: orders.shippingAddress.fullName,
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
        <Charts allsummary={allsummary} />
        <div className="container mx-auto h-fit py-10 my-5 bg-white shadow-md rounded-sm text-gray-900">
          <main className="w-full px-4 sm:px-6 lg:px-8 pt-4">
            <div className="">
              <h1 className="text-2xl font-semibold">Recent Orders</h1>
            </div>
            <div className="mt-6">
              <Table columns={columns} data={data} />
            </div>
          </main>
        </div>
      </AdminLayout>
    </>
  );
}

export default Dashboard;

export async function getServerSideProps() {
  const orderRes = await fetch(API_BASE_URL + "/orders/allorders");
  const allOrders = await orderRes.json();
  return {
    props: {
      allOrders: allOrders.map(db.convertDocToObj),
    },
  };
}
