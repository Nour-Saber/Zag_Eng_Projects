import mongoose from "mongoose";
const purchaseBillSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Types.ObjectId,
    ref: "Provider"
  },
  providerName: { type: String },
  providerAddress: { type: String },
  providerPhone: { type: String },

  products: [
    {
      name: { type: String },
      description: { type: String },
      productId: { type: mongoose.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
      price: { type: Number, min:0,required: true },
    },
  ],
  date: { type: String, required: true },
  total_cost: { type: Number, min:0,required: true },
  is_deleted: { type: Boolean, default: false },
});
export const PurchaseBill = mongoose.model("purchaseBill", purchaseBillSchema);
