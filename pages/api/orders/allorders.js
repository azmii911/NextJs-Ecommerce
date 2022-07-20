import nc from "next-connect";
import Order from "../../../models/OrderModel";
import db from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const order = await Order.find({});
  await db.disconnect();
  res.send(order);
});
export default handler;
