import CardStats from "./CardStats";
import {
  ShoppingBagIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  DocumentReportIcon,
} from "@heroicons/react/outline";
export default function HeaderStats({ allsummary }) {
  console.log(allsummary);
  return (
    <>
      {/* Header */}
      <div className=" bg-indigo-800 md:pt-32 pb-16 pt-12">
        {/* Card stats */}
        <div className="w-full px-10 flex flex-col md:flex-row md:justify-between md:space-x-20">
          <CardStats
            title="Total Sales"
            itemDetail={`$${allsummary.totalSales}`}
            percentage="14.6"
          >
            <CurrencyDollarIcon
              className="w-12 h-12
                  text-indigo-500 bg-indigo-100 rounded-md p-2"
            />
          </CardStats>
          <CardStats
            title="Total Orders"
            itemDetail={allsummary.orderCount}
            percentage="14.6"
          >
            <ShoppingBagIcon
              className="w-12 h-12
                  text-indigo-500 bg-indigo-100 rounded-md p-2"
            />
          </CardStats>
          <CardStats
            title="Total Products"
            itemDetail={allsummary.productsCount}
            percentage="14.6"
          >
            <DocumentReportIcon
              className="w-12 h-12
                  text-indigo-500 bg-indigo-100 rounded-md p-2"
            />
          </CardStats>
          <CardStats
            title="Total Users"
            itemDetail={allsummary.usersCount}
            percentage="14.6"
          >
            <UserGroupIcon
              className="w-12 h-12
                  text-indigo-500 bg-indigo-100 rounded-md p-2"
            />
          </CardStats>
        </div>
      </div>
    </>
  );
}
