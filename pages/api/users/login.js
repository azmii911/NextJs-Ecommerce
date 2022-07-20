import nc from "next-connect";
import User from "../../../models/UserModel";
import { signToken } from "../../../utils/auth";
import db from "../../../utils/db";
const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (user && req.body.password === user.password) {
      const token = signToken(user);
      res.status(200).send({
        token,
        user,
      });
      await db.disconnect();
    } else {
      res.status(401).send("Wrong Password");
      await db.disconnect();
    }
  } else {
    res.status(401).send("Email not found");
    await db.disconnect();
  }
});
export default handler;
