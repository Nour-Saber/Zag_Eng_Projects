import mongoose from "express";
const safeSchema = mongoose.Schema({
     balance:{type:Number},
     last_transaction_date:{type:String}
})
export const Safe = mongoose.Model('safe',safeSchema)