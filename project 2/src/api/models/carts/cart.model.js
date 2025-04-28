import mongoose from "mongoose";
import { User } from "../users/user.model.js";
import { Product } from "../products/products.model.js";

const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Types.ObjectId, ref: Product },
      quantity: { type: Number,min:1, required: true },
      price: { type: Number,min:0, required: true },
    },
  ],
  total_price: { type: Number, required: true },
  is_deleted: { type: Boolean, default: false },
});
export const Cart = mongoose.model("cart", cartSchema);
