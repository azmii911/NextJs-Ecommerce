import {
  TrendingUpIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/outline";
import React from "react";

function CardStats({ title, itemDetail, percentage, children }) {
  return (
    <div className="min-w-fit w-full bg-white rounded-md shadow-2xl md:my-0 my-2 p-5 flex justify-between items-center">
      <div>
        <div className="text-xl font-semibold text-gray-600">{title}</div>
        <div className="text-4xl font-semibold mb-1 text-gray-900">
          {itemDetail}
        </div>
        <div className="w-fit flex justify-between mt-2 bg-green-200 px-2 py-[1px] rounded-md">
          <TrendingUpIcon className="w-6 h-6  text-green-700" />
          <p className=" text-green-700">{percentage}%</p>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default CardStats;
