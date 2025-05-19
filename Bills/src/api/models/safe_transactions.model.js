import mongoose from "express";
const safe_transactionSchema = mongoose.Schema({
  provider: { type: mongoose.Types.ObjectId, ref: "Provider", required: true },
  bill:{type: mongoose.Types.ObjectId, ref: "Bill", required: true },
  cost: { type: Number, required: true },
  date: { type: String, required: true },
  is_deleted: { type: Boolean, default: false },
});
export const SafeTransaction = mongoose.Model(
  "transaction",
  safe_transactionSchema
);
