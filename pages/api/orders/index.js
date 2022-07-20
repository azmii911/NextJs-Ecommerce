import nc from "next-connect";
import Order from "../../../models/OrderModel";
import { isAuth } from "../../../utils/auth";
import db from "../../../utils/db";
import onError from "../../../utils/error";
const handler = nc({
  onError,
});

handler.use(isAuth);
handler.post(async (req, res) => {
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: req.user,
  });

  const order = await newOrder.save();
  res.status(201).send(order);
  await db.disconnect();
});
export default handler;
