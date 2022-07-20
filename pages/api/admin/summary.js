import nc from "next-connect";
import Order from "../../../models/OrderModel";
import Product from "../../../models/ProductModel";
import User from "../../../models/UserModel";
import db from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();

  const orderCount = await Order.countDocuments();
  const productsCount = await Product.countDocuments();
  const usersCount = await User.countDocuments();
  const orderPriceGroup = await Order.aggregate([
    {
      $group: {
        _id: null,
        sales: { $sum: "$totalPrice" },
      },
    },
  ]);

  const salesData = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        totalSales: { $sum: "$totalPrice" },
      },
    },
  ]);

  await db.disconnect();
  const totalSales = orderPriceGroup.length > 0 ? orderPriceGroup[0].sales : 0;
  res.send({
    orderCount,
    productsCount,
    usersCount,
    totalSales,
    orderPriceGroup,
    salesData,
  });
});
export default handler;
