import Books from "../models/BooksModel.js";
import Comment from "../models/CommentModel.js";

export const addReviews = async function (req, res) {
  const { id: _id } = req.params;
  const data = req.body;
  try {
    const exists = await Books.findOne({ _id });
    if (!exists) {
      throw new Error("books not found");
    }
    const comment = await Comment.create({ ...data });
    res.status(200).json({ comment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReviews = async function (req, res) {
  const { id: _id } = req.params;
  const data = req.body;
  try {
    const exists = await Books.findOne({ _id });
    if (!exists) {
      throw new Error("books not found");
    }
    const reviews = await Comment.find({ book_id: _id }).sort({ _id: -1 });
    res.status(200).json({ reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
