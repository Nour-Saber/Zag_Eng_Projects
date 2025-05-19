import mongoose from "express";
const cacheSchema = mongoose.Schema({
  balance: { type: Number },
  last_transaction_date: { type: String },
});
export const Cache = mongoose.Model("cache", cacheSchema);
