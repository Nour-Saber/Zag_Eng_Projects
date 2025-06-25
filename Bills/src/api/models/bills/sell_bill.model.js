import mongoose from "mongoose";

const sellBillSchema = new mongoose.Schema({
  clientId: { type: mongoose.Types.ObjectId, ref: "Client" },
  clientName: { type: String },
  clientAddress: { type: String },
  clientPhone: { type: String },
  products: [
    {
      name: { type: String },
      description: { type: String },
      productId: { type: mongoose.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
      price: { type: Number, min: 0, required: true },
    },
  ],
  total_cost: { type: Number, min: 0, required: true },
  date: { type: String, required: true },
  is_deleted: { type: Boolean, default: false },
});
export const SellBill = mongoose.model("sellBill", sellBillSchema);
