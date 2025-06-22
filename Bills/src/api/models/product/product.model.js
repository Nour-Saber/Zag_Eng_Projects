import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  provider:{type:mongoose.Types.ObjectId,ref:'Provider'},
  name: { type: String },
  description: { type: String },
  stock: { type: Number },
  is_deleted: { type: Boolean, default: false },
});
export const Product = mongoose.model("product", productSchema);
