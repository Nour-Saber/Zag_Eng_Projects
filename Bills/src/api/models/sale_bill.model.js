import mongoose from "mongoose";

const salebillSchema = mongoose.Schema({
  client: { type: mongoose.Types.ObjectId, ref: "Client", required: true },
  products: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total_cost: { type: Number, required: true },
  date: { type: String, required: true },
  is_deleted: { type: Boolean, default: false },
});
export const SaleBill = mongoose.Model("salebill", salebillSchema);
