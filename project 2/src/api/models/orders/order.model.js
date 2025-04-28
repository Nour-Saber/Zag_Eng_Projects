import mongoose from "mongoose";
import { User } from "../users/user.model.js";
import { Product } from "../products/products.model.js";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: User, required: true },
  items: [
    {
      product: { type: mongoose.Types.ObjectId, ref: Product, required:true },
      quantity: { type: Number,min:1},
      price: { type: Number,min:0},
    },
  ],
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "canceled"],
    default: pending,
  },
  payment: {
    type: Number,
    enum: ["pending", "paid", "failed"],
    default: pending,
  },
  address: { type: String, required: true },
  is_deleted: { type: Boolean, default: false },
});
export const Order = mongoose.Model("order", orderSchema);
