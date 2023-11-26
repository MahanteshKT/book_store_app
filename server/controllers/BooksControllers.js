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

import Books from "../models/BooksModel.js";
import Transactions from "../models/TransactionModel.js";

export const AddBooks = async function (req, res) {
  const { bookTitle, authorName, ...others } = req.body;
  try {
    const exists = await Books.findOne({ bookTitle, authorName });
    if (exists) {
      throw new Error("Book title already published by other person.");
    }
    const book = await Books.create({ bookTitle, authorName, ...others });
    res.status(200).json({ book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBooks = async function (req, res) {
  try {
    const books = await Books.find({}).sort({ createdAt: -1 });
    if (!books) {
      throw new Error("Error to get Books");
    }
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBooksByUserId = async function (req, res) {
  const { id: userId } = req.params;
  try {
    const books = await Books.find({ userId: userId });
    if (!books) {
      throw new Error("failed to get books");
    }
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookByBookId = async function (req, res) {
  const { id: _id } = req.params;
  try {
    const book = await Books.find({ _id });
    if (!book) {
      throw new Error("failed to get requested Book.");
    }
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBookByUserId = async function (req, res) {
  console.log("sudyfhs");
  const { userId, bookId: _id } = req.params;
  const data = req.body;
  try {
    const exists = await Books.find({ userId, _id });
    if (!exists) {
      throw new Error("could not find the reuested book");
    }
    let book = await Books.updateOne({ _id }, { ...data });
    book = await Books.findOne({ _id });
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const DeleteBookByBookId = async function (req, res) {
  const { id: _id } = req.params;
  try {
    const exists = await Books.findOne({ _id });
    if (!exists) {
      throw new Error("could not find the reuested book");
    }
    const book = await Books.deleteOne({ _id });
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBooksByCategory = async function (req, res) {
  const { query: category } = req.params;
  try {
    const books = await Books.find({ category });
    if (!books) {
      throw new Error("failed to get boooks.this error from server side");
    }
    res.status(200).json({ books });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTopBooks = async function (req, res) {
  try {
    const eachNoOfBooks = {};
    const allTransactions = await Transactions.find({});

    const booksId = [...allTransactions.flatMap((each) => each.booksId)];

    [...booksId].forEach((each) => {
      if (each.quantity > 0) {
        eachNoOfBooks[each._id] = +each.quantity || 0;
        each.quantity = 0;
      }
      eachNoOfBooks[each._id] = +eachNoOfBooks[each._id] + 1;
    });

    console.log(eachNoOfBooks);
    const topBooksId = Object.entries(eachNoOfBooks).sort(
      (a, b) => b[1] - a[1]
    );
    const allTopBooks = await Promise.all(
      topBooksId.map((each) => Books.findById({ _id: each[0] }))
    );

    res.status(200).json({
      books: allTopBooks.slice(0, 10),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
