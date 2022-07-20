import nc from "next-connect";
import Order from "../../../models/OrderModel";
import { isAuth } from "../../../utils/auth";
import db from "../../../utils/db";
import onError from "../../../utils/error";
const handler = nc({
  onError,
});

handler.use(isAuth);
handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({ user: req.user });
  res.send(orders);
  await db.disconnect();
});
export default handler;
