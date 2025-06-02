import mongoose from "mongoose";
const safeSchema = new mongoose.Schema({
  balance: { type: Number },
  last_transaction_date: { type: String },
});
export const Safe = mongoose.model("safe", safeSchema);
