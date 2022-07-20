/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { Close, isOpen } from "../store/cartStateSlice";
import { decrease, increase, remove } from "../store/cartSlice";
import CartInnerItems from "./CartInnerItems";
import Link from "next/link";
import CartCalculations from "./CartCalculations";

export default function Cart() {
  const [mounted, setMounted] = useState(false);

  const dispatch = useDispatch();

  const products = useSelector((state) => {
    return state.cart.cartItems;
  });

  const cartReduxtState = useSelector((state) => {
    return state.cartState;
  });

  // When mounted on client, now we can show the UI
  useLayoutEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <Transition.Root show={cartReduxtState} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          dispatch(Close());
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {" "}
                          Shopping cart{" "}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={async (e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              dispatch(isOpen(!cartReduxtState));
                            }}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {/* main Cart here */}
                      <CartInnerItems products={products} />
                    </div>

                    <CartCalculations products={products} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
