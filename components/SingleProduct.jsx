import React, { useState } from "react";
import NextLink from "next/link";
import ProductQuickView from "./ProductQuickView";
import Link from "next/link";
import { add, increase } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import { isOpen } from "../store/cartStateSlice";
import { BASE_URL } from "../config";
import Cookies from "js-cookie";

function SingleProduct({ product }) {
  const [quickview, setquickview] = useState(false);
  function quickViewHAndler(e) {
    e.preventDefault();
    setquickview(true);
  }

  const dispatch = useDispatch();

  const handleAddToCart = async (product) => {
    dispatch(add(product));
    dispatch(isOpen(true));
  };

  return (
    <>
      <div className="w-full mx-auto max-w-xs text-center p-4 shadow-sm mb-2 transition-all ease-linear hover:shadow-md">
        <Link href={`${BASE_URL}/product/${product.slug}`}>
          <img
            className="object-cover w-full h-80 mx-auto rounded-sm hover:opacity-80 cursor-pointer"
            src={product.images[0].src}
            alt={product.imageAlt}
          />
        </Link>

        <div className="mt-4 flex flex-row justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
              {product.name}
            </h3>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
              ${product.price}
            </h3>
          </div>
        </div>
        <div className="my-4 flex justify-between">
          <div className="mt-3 sm:mt-0">
            <span
              onClick={() => handleAddToCart(product)}
              className="w-full flex cursor-pointer items-center text-sm justify-center px-4 py-3 border border-transparent font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:text-sm md:py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Add to cart
            </span>
          </div>

          <div className="mt-3 sm:mt-0 sm:ml-3">
            <a
              onClick={quickViewHAndler}
              href=""
              className="w-full flex items-center text-sm justify-center px-4 py-3 border border-transparent font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:text-sm md:py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              View
            </a>
          </div>
        </div>
      </div>

      <ProductQuickView
        quickview={quickview}
        setquickview={setquickview}
        product={product}
      />
    </>
  );
}

export default SingleProduct;
