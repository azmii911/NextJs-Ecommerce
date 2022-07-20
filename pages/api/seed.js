import nc from "next-connect";
import Category from "../../models/CategoriesModel";
import Product from "../../models/ProductModel";
import User from "../../models/UserModel";
import db from "../../utils/db";
import data from "../../utils/dummyProducts";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await Category.deleteMany();
  await Category.insertMany(data.category);
  await User.deleteMany();
  await User.insertMany(data.users);
  await db.disconnect();
  res.send({ message: "Inserted" });
});

export default handler;
