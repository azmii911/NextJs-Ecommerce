import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: { type: Array, default: [] },
    colors: { type: Array, default: [] },
    sizes: { type: Array, default: [] },
    description: { type: String, required: true },
    highlights: { type: Array, default: [] },
    details: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
