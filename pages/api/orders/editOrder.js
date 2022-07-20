import nc from "next-connect";
import Order from "../../../models/OrderModel";
import db from "../../../utils/db";
import onError from "../../../utils/error";
const handler = nc({
  onError,
});

handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.body.id);
  order.isDeliverd = req.body.isDeliverd;
  await order.save();
  res.send({
    message: "Order status updated successfully",
    status: req.body.isDeliverd,
  });
  await db.disconnect();
});
export default handler;
