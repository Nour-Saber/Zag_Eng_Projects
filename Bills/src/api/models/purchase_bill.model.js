import mongoose from "express";
const purchasebillSchema = mongoose.Schema({
  provider: { type: mongoose.Types.ObjectId, ref: "Provider", required: true },
  products: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  date: { type: String, required: true },
  total_cost: { type: Number, required: true },
  is_deleted: { type: Boolean, default: false },
});
export const PurchaseBill = mongoose.Model("bill", purchasebillSchema);
