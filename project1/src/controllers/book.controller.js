import mongoose from "mongoose";
import { Book } from "../models/book.model.js";

<<<<<<< HEAD
export const addNewBookController = async (req, res) => {
  try {
    const book = req.body;
    const newBook = await Book(book);
    await newBook.save();
    if (newBook) {
      res.status(200).json({
        new_book: newBook,
        message: "successful !",
      });
    } else {
      throw Error("nothing  was added!");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const getOneBooksController = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (book) {
      res.status(200).json({
        Book: book,
      });
    } else {
      const error = new Error("Book is not found!");
      throw error;
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};
export const DeleteONeBookController = async (req, res) => {
  try {
    const { id } = req.params;
    //const id = req.params.id;
    const book = await Book.findByIdAndDelete(id);
    // const book = await Book.findById(id);
    // await Book.deleteOne(book);
    if (book) {
      res.status(200).send("Book is deleted !");
    } else {
      const error = new Error("Book is not found!");
      throw error;
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};
export const updateBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const newBook = req.body;
    const book = await Book.findByIdAndUpdate(id, newBook);
    if (book) {
      res.status(200).json({
        book: newBook,
        message: "book is updated successfully !",
      });
    } else {
      const error = new Error("book is not found !");
      throw error;
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};
export const getAllBooksController = async (req, res) => {
  try {
    const allBooks = await Book.find();
    if (allBooks) {
      res.status(200).json({ books: allBooks, message: "successful !" });
    } else {
      const error = new Error("books not found!");
      throw error;
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};
=======
    }
    catch(err){

      res.status(400).send(err.message);
    }

}
>>>>>>> 9ace613b4512253d19d3995d7eda0ce019cb9151
