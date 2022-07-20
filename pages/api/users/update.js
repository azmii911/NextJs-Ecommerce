import nc from "next-connect";
import User from "../../../models/UserModel";
import { isAuth } from "../../../utils/auth";
import db from "../../../utils/db";
import onError from "../../../utils/error";
const handler = nc({
  onError,
});

handler.use(isAuth);
handler.put(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.user);
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.address.address = req.body.address;
  user.address.country = req.body.country;
  user.address.city = req.body.city;
  user.address.state = req.body.state;
  user.address.postalCode = req.body.zip;
  await user.save();
  res.send({ message: "Profile updated successfully", user });
  await db.disconnect();
});
export default handler;
