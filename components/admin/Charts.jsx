import React from "react";
import Chart from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";

function Charts({ allsummary }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col  md:flex-row justify-evenly  my-10  ">
          <div className=" bg-white shadow-md rounded-sm p-5 flex-grow">
            <h1 className="text-4xl font-semibold">Sales Report</h1>
            <Bar
              data={{
                labels: allsummary?.salesData?.map((x) => x._id),
                datasets: [
                  {
                    label: "Sales",
                    backgroundColor: "#7e89f2",
                    data: allsummary?.salesData?.map((x) => x.totalSales),
                  },
                ],
              }}
              options={options}
            />
          </div>
          <div className="bg-white shadow-md rounded-sm p-5  ml-5">
            <h1 className="text-4xl font-semibold">Another Report</h1>
            <Pie
              data={{
                labels: allsummary?.salesData?.map((x) => x._id),
                datasets: [
                  {
                    label: "Sales",
                    backgroundColor: "#7e89f2",
                    data: allsummary?.salesData?.map((x) => x.totalSales),
                  },
                ],
              }}
              className="my-5"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Charts;
