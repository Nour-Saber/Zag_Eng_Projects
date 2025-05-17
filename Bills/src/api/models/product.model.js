import mongoose from 'express';
 

const productSchme= mongoose.Schema({
    name:{type:String},
    description:{type:String},
    stock:{type:Number},
    is_deleted:{type:Boolean,default:false}
})
export const Product=mongoose.Model('product',productSchme)