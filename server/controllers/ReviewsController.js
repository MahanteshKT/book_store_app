import Books from "../models/BooksModel.js";
import Comment from "../models/CommentModel.js";
import User from "../models/UserModel.js";

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

export const getTopReviews = async function (req, res) {
  try {
    const eachNoOfBooks = {};
    const topComment = await Comment.find({ Rating: { $gte: 4 } }).sort({
      createdAt: -1,
    });

    const TopReviews = await Promise.all(
      topComment.slice(0, 10).map(async (each) => {
        return {
          bookDetails: await Books.findOne({ _id: each.book_id }),
          userDetails: await User.findOne({ _id: each.user_id }),
          _id: each._id,
          Rating: each.Rating,
          commentDescription: each.commentDescription,
          images: each.images,
          userName: each.userName,
          recommend: each.recommend,
          createdAt: each.createdAt,
        };
      })
    );
    // console.log(TopReviews);

    res.status(200).json({
      topReviews: TopReviews,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
