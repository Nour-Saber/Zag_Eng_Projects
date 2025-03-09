import mongoose from 'mongoose';
import {Book} from '../models/book.model.js'
export const addNewBookController = async (req,res)=>{
    try{
        const book = req.body;
        const newBook = await Book(book);
        await newBook.save();
        if(newBook )
        {
            
        res.status(200).json({
            new_book : newBook,
            message : "successful !"
        })
    }
    else
    {
          throw Error("nothing  was added!")
    }

    }
    catch(err){

      res.status(400).send(err.message);
    }

}
