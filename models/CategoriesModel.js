import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, default: "" },
    details: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.models.Category || mongoose.model('Category', categoriesSchema);

export default Category