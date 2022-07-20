import React, { useEffect, useState } from "react";
import db from "../../utils/db";
import { API_BASE_URL, BASE_URL } from "../../config";
import dynamic from "next/dynamic";
const UserDashLayout = dynamic(
  () => import("../../components/UserDashLayout"),
  {
    ssr: false,
  }
);
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";

function OrderDetials(props) {
  const { categories } = props;

  const userInfo = useSelector((state) => state.userInfo);

  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        setloading(true);
        const { data } = await axios.get(
          `${API_BASE_URL}/orders/orderHistory`,
          {
            headers: {
              authorization: `Bearer ${userInfo?.token}`,
            },
          }
        );
        if (data) {
          setorders(data);
          setloading(false);
        }
      } catch (error) {
        setloading(false);

        toast.error(
          `${JSON.stringify(
            error.response && error.response.data && error.response.data.message
              ? error.response.data.message
              : error.message
          )}`,
          {
            position: "top-center",
            autoClose: 5000,
          }
        );
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <>
      <UserDashLayout categories={categories}>
        <div>
          <h1 className="text-4xl font-bold my-5">Order History</h1>
        </div>
        {loading ? (
          <svg
            role="status"
            className="w-20 h-20 mt-20 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-indigo-600"
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
        {orders ? (
          ""
        ) : (
          <>
            <h1 className="md:text-4xl text-xl mt-20 text-center font-bold my-5">
              You have No Order History
            </h1>
            <Link href={`${BASE_URL}/store`}>
              <button
                className="w-52 mx-auto my-5 cursor-pointer flex items-center
                justify-center rounded-md border border-transparent
                bg-indigo-600 px-6 py-3 text-base font-medium text-white
                shadow-sm hover:bg-indigo-700"
              >
                {" "}
                Go to shop
              </button>
            </Link>
          </>
        )}
        {orders
          ? orders?.map((order, i) => (
              <div
                key={order._id}
                className="bg-gray-100 rounded-md my-5 shadow-inherit py-10 flex flex-col md:flex-row justify-between px-5"
              >
                <div className="flex md:flex-row flex-col justify-start space-y-5 md:space-y-0 md:space-x-12">
                  <div className="flex flex-col">
                    <p className="text-md">Date Placed</p>
                    <p className="text-gray-600 text-sm">
                      {order.createdAt.slice(0, 13)}
                    </p>
                  </div>
                  <div className="flex flex-col flex-wrap">
                    <p className="text-md">Order Number</p>
                    <p className="text-gray-600 text-sm bg-white p-[2px] w-fit">
                      {order._id.slice(10, order._id.length)}
                    </p>
                  </div>
                  <div className="flex flex-col flex-wrap">
                    <p className="text-md">Total</p>
                    <p className="text-gray-600 text-sm">${order.totalPrice}</p>
                  </div>
                  <div className="flex flex-col flex-wrap">
                    <p className="text-md">Status</p>
                    <p className="text-gray-600 text-sm">
                      {order.isPaid.toString() === "false"
                        ? "Not Paid"
                        : "Paid"}
                    </p>
                  </div>
                  <div className="flex flex-col flex-wrap">
                    <p className="text-md">Delivered</p>
                    <p className="text-gray-600 text-sm">
                      {order.isDeliverd.toString() === "false"
                        ? "Not Delivered"
                        : "Delivered"}
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <Link href={`${BASE_URL}/order/${order._id}`}>
                    <a className="w-full mt-5 md:my-0 inline-block text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700">
                      View Details
                    </a>
                  </Link>
                </div>
              </div>
            ))
          : ""}
      </UserDashLayout>
    </>
  );
}

export default OrderDetials;

export async function getServerSideProps() {
  const categoriesRes = await fetch(API_BASE_URL + "/categories");
  const categories = await categoriesRes.json();

  return {
    props: {
      categories: categories.map(db.convertDocToObj),
    },
  };
}
