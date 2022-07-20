import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../config";
import { decrease, increase, remove } from "../store/cartSlice";

function CartInnerItems({ products }) {
  const dispatch = useDispatch();

  const handleIncrease = async (id) => {
    dispatch(increase(id));
  };
  const handleDecrease = async (id) => {
    dispatch(decrease(id));
  };
  const removeHandler = async (id) => {
    dispatch(remove(id));
  };
  if (products.length === 0) {
    return (
      <>
        <div className="py-20">
          <h1 className="text-2xl text-center py-5">
            No products in the cart.
          </h1>
          <div className="bg-center w-4/12 mx-auto my-10">
            <div className="rounded-md shadow"></div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="bg-gray-50 px-4 py-4 rounded-sm">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {products?.map((product) => (
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
                      <p className="ml-4 transition ease-linear">
                        ${product.price * product.quantity}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{product.slug}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex flex-row px-2 text-xl ">
                      <button
                        type="button"
                        className="px-2 text-white bg-indigo-600 cursor-pointer rounded-sm"
                        onClick={() => handleDecrease(product._id)}
                      >
                        -
                      </button>

                      <p className=" bg-gray-50 px-5">{product.quantity}</p>
                      <button
                        type="button"
                        className="px-2 text-white bg-indigo-600 cursor-pointer rounded-sm"
                        onClick={() => handleIncrease(product._id)}
                      >
                        +
                      </button>
                    </div>

                    <div className="flex">
                      <button
                        type="button"
                        onClick={async (e) => {
                          e.preventDefault();
                          await removeHandler(product._id);
                        }}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default CartInnerItems;
