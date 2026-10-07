import mongoose from "mongoose";
import Book from "../models/Book.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json({ success: true, data: books });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid book ID" });
    }
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    res.json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
