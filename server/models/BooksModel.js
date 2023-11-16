// userId
// authorName
// bookTitle
// imageUrl
// bookTitle
// imageUrl
// category
// bookDescription
// userPicturePath
// tags
// likes
// bookPdfURL

import mongoose from "mongoose";

const BookSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    bookTitle: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },

    category: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    bookDescription: String,
    userPicturePath: String,
    tags: {
      type: Array,
      default: [],
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    bookPdfURL: {
      type: String,
    },
  },
  { timestamps: true }
);

const Books = mongoose.model("books", BookSchema);

export default Books;
