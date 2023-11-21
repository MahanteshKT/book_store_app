import express from "express";
import { VerifyToken } from "../middleware/AuthMiddleware.js";
import {
  AddBooks,
  getBooks,
  getBooksByUserId,
  updateBookByUserId,
  DeleteBookByBookId,
  getBooksByCategory,
  getBookByBookId,
} from "../controllers/BooksControllers.js";

const router = express.Router();

router.post("/add-book", VerifyToken, AddBooks);
router.get("/get-books", VerifyToken, getBooks);
router.get("/get-book/:id", getBookByBookId);
router.get("/get-books-category/:query", VerifyToken, getBooksByCategory);
router.patch("/update-book/:userId/:bookId", VerifyToken, updateBookByUserId);
router.get("/get-books/:id", VerifyToken, getBooksByUserId);

router.delete("/delete-book/:id", VerifyToken, DeleteBookByBookId);

export default router;
