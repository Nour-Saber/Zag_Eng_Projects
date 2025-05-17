import mongoose from "express";
const billSchema = mongoose.Schema(
  {
    products: [
      {
        name: { type: String ,required:true},
        price: { type: Number,required:true },
        description: { type: String ,required:true},
        quantity: { type: Number ,required:true},
      },
    ],
    date: { type: String },
    total_cost: { type: Number },
    status: { type: String, enum: ["sell", "buy"] },
    is_deleted: { type: Boolean,default:false },
  }
);
export const Bill = mongoose.Model("bill", billSchema);
