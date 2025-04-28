import mongoose from "mongoose";

const productSchema = new mongoose.Schema ({
    name : {type:String},
    price :{type :Number},
    description :{trpe :String},
    category :{type:mongoose.Schema.Types.ObjectId,ref:"category"},
    image:{type:String},
    brand:{type:String},
    rating:{type:Number},
    is_deleted :{type :Boolean,default:false}
},{
    timestamps:true
})
export const  Product = mongoose.model("product",productSchema);
