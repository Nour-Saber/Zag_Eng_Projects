import mongoose from 'mongoose'
const bookSchema = new mongoose.Schema({
    title:{type:String},
    author:{type:String},
    publishingYear:{type:String}
});

export const Book =  mongoose.model("book",bookSchema );