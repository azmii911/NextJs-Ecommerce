import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Charts from "../../components/admin/Charts";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/userSlice";
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
import {
  ClockIcon,
  LockClosedIcon,
  PlusCircleIcon,
  XIcon,
} from "@heroicons/react/solid";

function Users({ allUsers, ip }) {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.userInfo);

  // Model Work Start --

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();
  const signUpHAndler = async ({
    firstName,
    lastName,
    email,
    role,
    password,
  }) => {
    try {
      const responseData = await axios.post(`${API_BASE_URL}/users/signup`, {
        firstName,
        lastName,
        email,
        password,
        ip,
        isAdmin: role.toString() === "true" ? "true" : "false",
      });
      if (responseData) {
        toast.success("User Added Successfully");
        setShowModal(false);
      }
    } catch (error) {
      toast.error(
        `${JSON.stringify(
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message
        )}, `
      );
    }
  };
  useEffect(() => {
    setloading(false);
  }, []);

  // Model workl end ../
  const getData = () => {
    const data = allUsers?.map((users, i) => ({
      userid: users._id,
      date: users.createdAt.slice(0, 13),
      f_name: users.firstName,
      l_name: users.lastName,
      email: users.email,
      pass: users.password,
      role: users.isAdmin.toString() === "true" ? "Admin" : "User",
    }));
    return [...data];
  };
  const columns = useMemo(
    () => [
      {
        Header: "user ID",
        accessor: "userid",
      },
      {
        Header: "Member Since",
        accessor: "date",
      },

      {
        Header: "First Name",
        accessor: "f_name",
      },
      {
        Header: "Last Name",
        accessor: "l_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Password",
        accessor: "pass",
      },
      {
        Header: "Role",
        accessor: "role",
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
              <button
                onClick={(e) => setShowModal(true)}
                className="flex items-center space-x-2 text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700"
              >
                <PlusCircleIcon className="h-5 w-5 block" />
                <h1>Add a New User</h1>
              </button>
            </div>
            <div className="mt-6">
              <Table columns={columns} data={data} />
            </div>
          </main>
        </div>
      </AdminLayout>
      <UserModal
        showModal={showModal}
        setShowModal={setShowModal}
        user={user}
        handleSubmit={handleSubmit}
        signUpHAndler={signUpHAndler}
        register={register}
        errors={errors}
      />
    </>
  );
}

export default Users;

export async function getServerSideProps(context) {
  const userRes = await fetch(API_BASE_URL + "/users/");
  const allUsers = await userRes.json();
  let ip;

  const { req } = context;

  if (req.headers["x-forwarded-for"]) {
    ip = req.headers["x-forwarded-for"].split(",")[0];
  } else if (req.headers["x-real-ip"]) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }
  return {
    props: {
      ip,
      allUsers: allUsers.map(db.convertDocToObj),
    },
  };
}

export function UserModal({
  showModal,
  setShowModal,
  user,
  handleSubmit,
  signUpHAndler,
  register,
  errors,
}) {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add a new user</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 ">
                  <div className="w-[100%]">
                    <p className="mb-5 text-gray-600">
                      The goal of this project is to provide a better starting
                      point for form elements that looks good out of the box but
                      is still fairly neutral, and is easy to customize by
                      adding utilities instead of having to write the complex
                      CSS necessary to style form elements across browsers
                      yourself.
                    </p>
                  </div>
                  <form
                    className=""
                    id="addAuser"
                    onSubmit={handleSubmit(signUpHAndler)}
                  >
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div>
                        <label htmlFor="first-name" className="sr-only">
                          First name
                        </label>
                        <input
                          {...register("firstName", {
                            required: true,
                            minLength: 2,
                            maxLength: 20,
                          })}
                          type="text"
                          className="rounded-sm mb-5 h-16  relative  w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-xl"
                          placeholder="First Name"
                        />
                        <p className="text-md text-red-500">
                          {errors.firstName?.type === "required" &&
                            "First Name is required"}
                          {errors.firstName?.type === "minLength" &&
                            "Min length is 2"}
                          {errors.firstName?.type === "maxLength" &&
                            "Max length is 20"}
                        </p>
                      </div>
                      <div>
                        <label htmlFor="last-name" className="sr-only">
                          Last name
                        </label>
                        <input
                          {...register("lastName", {
                            required: true,
                            minLength: 2,
                            maxLength: 20,
                          })}
                          type="text"
                          className="rounded-sm mb-5 h-16  relative  w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-xl"
                          placeholder="Last Name"
                        />
                        <p className="text-md text-red-500">
                          {errors.lastName?.type === "required" &&
                            "Last Name is required"}
                          {errors.lastName?.type === "minLength" &&
                            "Min length is 2"}
                          {errors.lastName?.type === "maxLength" &&
                            "Max length is 20"}
                        </p>
                      </div>
                      <div>
                        <label htmlFor="email-address" className="sr-only">
                          Email address
                        </label>
                        <input
                          {...register("email", {
                            required: true,
                            pattern: "[a-z0-9]+@[a-z]+.[a-z]{2,3}",
                          })}
                          type="email"
                          autoComplete="email"
                          className="rounded-sm mb-5 h-16  relative  w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-xl"
                          placeholder="Email address"
                        />
                        <p className="text-md text-red-500">
                          {errors.email?.type === "required" &&
                            "Email is required"}
                          {errors.email?.type === "pattern" &&
                            "Email is not valid"}
                        </p>
                      </div>
                      <div>
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <input
                          {...register("password", {
                            required: true,
                            minLength: 5,
                            maxLength: 20,
                          })}
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          className="rounded-sm mb-5 h-16  relative  w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-xl"
                          placeholder="Password"
                        />{" "}
                        <p className="text-md text-red-500">
                          {errors.password?.type === "required" &&
                            "Password  is required"}
                          {errors.password?.type === "minLength" &&
                            "Password must be greater then 4 digits"}
                          {errors.password?.type === "maxLength" &&
                            "Password must be less then 20 digits"}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          {...register("role", {
                            required: false,
                          })}
                          className="h-6 w-6 border border-indigo-600 rounded-sm  transition duration-200  cursor-pointer"
                          type="checkbox"
                        />
                        <label
                          className="inline-block text-gray-800 text-xl mx-5"
                          htmlFor="flexCheckDefault"
                        >
                          is Admin?
                        </label>
                      </div>
                    </div>

                    {/* <p className="text-md text-red-500">{error}</p> */}
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <input
                    type="submit"
                    value="Add a new User"
                    form="addAuser"
                    className=" my-5 cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
