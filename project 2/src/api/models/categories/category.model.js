import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name:{type:String},
    description :{type:String},
    is_deleted :{type:Boolean,default:false}
})
export const Category = mongoose.model("category",CategorySchema);