import Order from "../../models/OrderModel";
import db from "../../utils/db";
import Link from "next/link";
import { API_BASE_URL, BASE_URL } from "../../config";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
const Layout = dynamic(() => import("../../components/Layout"), {
  ssr: false,
});

export default function OrderPage(props) {
  const { order, categories } = props;
  const userInfo = useSelector((state) => state.userInfo);
  useEffect(() => {
    if (!userInfo) {
      Router.push("/login");
    }
  }, []);

  if (order.length === 0) {
    return (
      <>
        <Layout categories={categories}>
          <div className="py-60">
            <h1 className="text-6xl text-center py-5">
              Something went wrong{" "}
              <span className="bg-red-500 p-1">{paramenterValue}</span>
            </h1>
            <div className="bg-center w-4/12 mx-auto my-10">
              <div className="rounded-md shadow">
                <Link href="/">
                  <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                    {"<-- Back to Store"}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
  return (
    <>
      <Layout categories={categories}>
        <OrderDetailScreen order={order}>
          <OrderStatusDetaila order={order} />
        </OrderDetailScreen>
      </Layout>
    </>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const categoriesRes = await fetch(API_BASE_URL + "/categories");
  const categories = await categoriesRes.json();
  await db.connect();
  const orderr = await Order.findOne({ _id: id }).lean();
  const order = JSON.parse(JSON.stringify(orderr));
  await db.disconnect();

  return {
    props: {
      order: db.convertDocToObj(order),
      categories: categories.map(db.convertDocToObj),
    },
  };
}

export function ProductDetailsTable({ order }) {
  return (
    <div className="md:w-10/12 bg-gray-100 px-4 py-4 rounded-sm">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {order.orderItems?.map((product) => (
            <li key={product._id} className="flex py-6 mt-5">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border cursor-pointer border-gray-200">
                <Link href={`${BASE_URL}/product/${product.slug}`}>
                  <img
                    src={product.images[0].src}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </Link>
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <Link href={`${BASE_URL}/product/${product.slug}`}>
                      <h3 className="cursor-pointer">
                        <a href={product.href}> {product.name} </a>
                      </h3>
                    </Link>
                    <div>
                      <p className="ml-4 transition ease-linear">
                        ${product.price}
                      </p>
                      <p className="ml-4 transition ease-linear">
                        Qty({product.quantity})
                      </p>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{product.slug}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function OrderStatusDetaila({ order }) {
  return (
    <>
      <ol role="list" className="max-w-2xl  flex space-x-2 lg:max-w-7xl my-5">
        <li>
          <div className="flex ">
            <Link
              href="/user"
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
              href="/user/orders"
              className="mr-2 text-sm font-medium text-gray-900"
            >
              Order History
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
              href={`/order/${order._id}`}
              className="mr-2 text-sm font-medium text-gray-900"
            >
              {order._id}
            </Link>
          </div>
        </li>
      </ol>
      <h2 className="md:text-2xl text-xl font-bold tracking-tight text-indigo-600">
        Thank You
      </h2>

      {order.isDeliverd.toString() === "false" ? (
        <>
          <h2 className="md:text-6xl text-3xl  font-bold tracking-tight">
            It is on the Way
          </h2>
          <p className="w-full mt-5 mx-auto md:text-xl text-md  text-gray-600">
            your order
            <span className="bg-gray-200 p-1 mx-1">#{order._id}</span> has been
            recieved and will be with you soon.
          </p>
        </>
      ) : (
        <>
          <p className="w-full mt-5 mx-auto md:text-xl text-md  text-gray-600">
            your order
            <span className="bg-gray-200 p-1 mx-1">#{order._id}</span> has been
            <span className="bg-gray-200 p-1 mx-1">Delivered</span> to you at{" "}
            {order.deliveredAt}.
          </p>
        </>
      )}
    </>
  );
}

export function OrderDetailScreen({ order, children }) {
  return (
    <div className="bg-white ">
      <div className="max-w-2xl mx-auto  py-4 px-4 sm:py-8 sm:px-6 lg:max-w-screen-2xl lg:px-8">
        {children}
        <div className="my-10">
          <ProductDetailsTable order={order} />
        </div>

        <div className="flex flex-col flex-start ">
          <div className="md:w-10/12  mt-10 md:py-5 p-5 bg-gray-100 flex justify-between flex-col md:flex-row">
            <div>
              <p className="w-full  mx-auto md:text-2xl text-md  text-gray-900">
                Shipping address
              </p>
              <p className="w-full  mx-auto md:text-md text-sm  text-gray-600">
                {order.shippingAddress.address}
              </p>
              <p className="w-full  mx-auto md:text-md text-sm  text-gray-600">
                {order.shippingAddress.sate}
              </p>
              <p className="w-full  mx-auto md:text-md text-sm  text-gray-600">
                {order.shippingAddress.city}
              </p>
              <p className="w-full  mx-auto md:text-md text-sm  text-gray-600">
                {order.shippingAddress.country}
              </p>
              <p className="w-full  mx-auto md:text-md text-sm  text-gray-600">
                {order.shippingAddress.zip}
              </p>
            </div>
            <div>
              <p className="w-full  mx-auto md:text-2xl text-md  text-gray-900">
                Billing address
              </p>
              <p className="w-full  mx-auto md:text-md text-sm  text-gray-600">
                {order.shippingAddress.address}
              </p>
              <p className="w-full  mx-auto md:text-md text-sm  text-gray-600">
                {order.shippingAddress.sate}
              </p>
              <p className="w-full  mx-auto md:text-md text-sm  text-gray-600">
                {order.shippingAddress.city}
              </p>
              <p className="w-full  mx-auto md:text-md text-sm  text-gray-600">
                {order.shippingAddress.country}
              </p>
              <p className="w-full  mx-auto md:text-md text-sm  text-gray-600">
                {order.shippingAddress.zip}
              </p>
            </div>
          </div>

          <div className="md:w-10/12 md:py-5 p-5 border-t-2 bg-gray-100 flex  flex-col">
            <div>
              <p className="w-full  mx-auto md:text-2xl text-md  text-gray-900">
                Payment Method
              </p>
              <p className="w-full  mx-auto md:text-md text-sm  text-gray-600">
                {order.paymentMethod === "COD"
                  ? "Cash on Deliver"
                  : order.paymentMethod}
              </p>
            </div>
            <div className="mt-5">
              <p className="w-full  mx-auto md:text-2xl text-md  text-gray-900">
                Shipping Method
              </p>
              <p className="w-full  mx-auto md:text-md text-sm  text-gray-600">
                {order.paymentMethod === "COD"
                  ? "Cash on Deliver"
                  : order.paymentMethod}
              </p>
              <p className="w-full  mx-auto md:text-md text-sm  text-gray-600">
                {order.paymentMethod === "COD"
                  ? "Takes up to 12 - 14 working days"
                  : "Takes up to 3 working days"}
              </p>
            </div>
          </div>
          <div className="md:w-10/12 md:py-5 border-t-2 p-5 bg-gray-100 flex justify-between flex-row">
            <div>
              <p className="w-full my-5 mx-auto  text-md  text-gray-900">
                Sub Total
              </p>
              <p className="w-full  my-5   mx-auto text-md  text-gray-900">
                Shipping price
              </p>
              <p className="w-full   my-5  mx-auto  text-md  text-gray-900">
                Total Order
              </p>
            </div>
            <div className="">
              <p className="w-full   my-5  mx-auto  text-md font-bold text-gray-600">
                ${order.totalPrice - order.shippingPrice}
              </p>
              <p className="w-full   my-5  mx-auto text-md font-bold text-gray-600">
                ${order.shippingPrice}
              </p>
              <p className="w-full   my-5  mx-auto  text-md font-bold text-indigo-600">
                ${order.totalPrice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
