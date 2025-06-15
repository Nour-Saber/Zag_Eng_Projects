import mongoose from "mongoose";
const safe_transactionSchema = new mongoose.Schema({
  provider: { type: mongoose.Types.ObjectId, ref: "Provider", required: true },
  bill: { type: mongoose.Types.ObjectId, ref: "Bill", required: true },
  cost: { type: Number, required: true },
  date: { type: String, required: true },
  is_deleted: { type: Boolean, default: false },
});
export const SafeTransaction = mongoose.model(
  "safe_transaction",
  safe_transactionSchema
);
