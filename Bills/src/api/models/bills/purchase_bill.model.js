import mongoose from "mongoose";
const purchaseBillSchema = new mongoose.Schema({
  provider: { type: mongoose.Types.ObjectId, ref: "Provider", required: true },
  products: [
    {
      product:{type:mongoose.Types.ObjectId,ref:'Product'},
      description: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  date: { type: String, required: true },
  total_cost: { type: Number, required: true },
  is_deleted: { type: Boolean, default: false },
});
export const PurchaseBill = mongoose.model("purchaseBill", purchaseBillSchema);
