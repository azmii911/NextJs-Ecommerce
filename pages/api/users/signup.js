import nc from "next-connect";
import User from "../../../models/UserModel";
import { signToken } from "../../../utils/auth";
import db from "../../../utils/db";
const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const emailExist = await User.findOne({ email: req.body.email });

  if (!emailExist) {
    const insertedUSer = await User.insertMany(req.body);
    if (insertedUSer) {
      const user = await User.findOne({ email: req.body.email });
      const token = signToken(user);
      res
        .status(200)
        .send({
          token,
          user,
        })
        .json({ message: `${user.firstName} Added Success` });
      await db.disconnect();
      return true;
    }
  } else {
    res.status(401).json({ message: `Email ${req.body.email} Already Exist` });
    await db.disconnect();
    return false;
  }
});
export default handler;
