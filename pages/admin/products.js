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
import { API_BASE_URL, BASE_URL } from "../../config";
const AdminLayout = dynamic(
  () => import("../../components/admin/AdminLayout"),
  {
    ssr: false,
  }
);

import db from "../../utils/db";
import Link from "next/link";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/solid";

function Products({ allProdcuts }) {
  const btn = (id) => {
    return (
      <Link href={`${BASE_URL}/order/${id}`}>
        <button className="flex items-center space-x-2 text-center bg-indigo-600 border border-transparent rounded-md py-2 px-4 font-medium text-white hover:bg-indigo-700">
          <PencilIcon className="h-5 w-5 block" />
          <h1>Edit</h1>
        </button>
      </Link>
    );
  };
  const getData = () => {
    const data = allProdcuts?.map((products, i) => ({
      product_id: products._id,
      name: products.name,
      slug: products.slug,
      category: products.category,
      action: btn(products._id),

      price: `$${products.price}`,
      imgUrl: products.images[0].src,

      date: products.createdAt.slice(0, 13),
    }));
    return [...data];
  };
  const columns = useMemo(
    () => [
      {
        Header: "Image",
        imgAccessor: "imgUrl",
        Cell: AvatarCell,
      },
      {
        Header: "Product ID",
        accessor: "product_id",
      },
      {
        Header: "Name",
        accessor: "name",
      },

      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Price",
        accessor: "price",
      },

      {
        Header: "Date Published",
        accessor: "date",
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
        <div className="container mx-auto h-fit py-10 my-5 bg-white shadow-md rounded-sm text-gray-900">
          <main className="w-full px-4 sm:px-6 lg:px-8 pt-4">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold">All Products</h1>
              <Link href="#">
                <button className="flex items-center space-x-2 text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700">
                  <PlusCircleIcon className="h-5 w-5 block" />
                  <h1>Add a New Product</h1>
                </button>
              </Link>
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

export default Products;

export async function getServerSideProps() {
  const productRes = await fetch(API_BASE_URL + "/products/");
  const allProdcuts = await productRes.json();
  return {
    props: {
      allProdcuts: allProdcuts.map(db.convertDocToObj),
    },
  };
}
