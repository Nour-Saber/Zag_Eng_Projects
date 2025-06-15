import mongoose from "mongoose";
const cache_drawer_transactionSchema = new mongoose.Schema({
  client: { type: mongoose.Types.ObjectId, ref: "Client", required: true },
  bill: { type: mongoose.Types.ObjectId, ref: "Bill", required: true },
  cost: { type: Number, required: true },
  date: { type: String, required: true },
  is_deleted: { type: Boolean, default: false },
});
export const CacheDrawerTransaction = mongoose.model(
  "cache_drawer_transaction",
  cache_drawer_transactionSchema
);
