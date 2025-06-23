import mongoose from "mongoose";
const purchaseBillSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Types.ObjectId,
    ref: "Provider",
    required: true,
  },
  products: [
    {
      name: { type: String },
      productId: { type: mongoose.Types.ObjectId, ref: "Product" },
      description: { type: String },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  date: { type: String, required: true },
  total_cost: { type: Number, required: true },
  is_deleted: { type: Boolean, default: false },
});
export const PurchaseBill = mongoose.model("purchaseBill", purchaseBillSchema);
