import Link from "next/link";
import React, { useLayoutEffect, useState } from "react";

export default function CartCalculations({ products }) {
  const [mounted, setMounted] = useState(false);
  // When mounted on client, now we can show the UI
  useLayoutEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <>
      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>
            $
            {products
              ? products?.reduce((amount, item) => amount + item.price, 0)
              : ""}
          </p>
        </div>

        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>
            Total -{" "}
            {products
              ? products?.reduce((amount, item) => amount + item.quantity, 0)
              : ""}
            items
          </p>
          <p>
            $
            {products?.reduce(
              (amount, item) => amount + item.quantity * item.price,
              0
            )}
          </p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link href={"/checkout"} passHref>
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </a>
          </Link>
        </div>
        <div className="mt-6">
          <Link href={"/cart"} passHref>
            <a
              href=""
              className="flex items-center justify-center rounded-md border border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200 px-6 py-3 text-base font-medium  shadow-sm "
            >
              View Cart
            </a>
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{" "}
            <Link href="/store">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
