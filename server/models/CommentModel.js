import mongoose from "mongoose";

// Rating
// commentDescription
// user_id
// userName
// bookTitle

const CommentSchema = new mongoose.Schema(
  {
    Rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    commentDescription: {
      type: String,
      minLength: 1,
      maxLength: 500,
      trim: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
    },
    userName: {
      type: String,
    },
    bookTitle: {
      type: String,
      min: 2,
      max: 100,
    },
    images: {
      type: Array,
      default: [],
    },
    recommend: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", CommentSchema);

export default Comment;
