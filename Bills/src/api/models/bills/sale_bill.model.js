import mongoose from "mongoose";

const saleBillSchema = new mongoose.Schema({
  client: { type: mongoose.Types.ObjectId, ref: "Client", required: true },
  products: [
    {
      product:{type:mongoose.Types.ObjectId,ref:'Product'},
      description: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total_cost: { type: Number, required: true },
  date: { type: String, required: true },
  is_deleted: { type: Boolean, default: false },
});
export const SaleBill = mongoose.model("saleBill", saleBillSchema);
