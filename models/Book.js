import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    stock: { type: Number, default: 0 },
    cover: { type: String }, // URL to cover image
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
