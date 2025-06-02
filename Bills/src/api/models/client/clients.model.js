import mongoose from 'mongoose';
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  is_deleted: { type: Boolean, default: false },
});
export const Client = mongoose.model("client", clientSchema);
