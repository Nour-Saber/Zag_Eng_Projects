import mongoose from "mongoose";
const cacheSchema = new mongoose.Schema({
  balance: { type: Number },
  last_transaction_date: { type: String },
});
export const CacheDrawer = mongoose.model("cache", cacheSchema);
