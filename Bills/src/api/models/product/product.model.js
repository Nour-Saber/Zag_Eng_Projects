import mongoose from "mongoose";

const productSchme = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  stock: { type: Number },
  is_deleted: { type: Boolean, default: false },
});
export const Product = mongoose.model("product", productSchme);
