import mongoose from "express";
const clientSchema = mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  is_deleted: { type: Boolean, default: false },
});
export const Client = mongoose.Model("safe", clientSchema);
