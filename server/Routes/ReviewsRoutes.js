import express from "express";
import { VerifyToken } from "../middleware/AuthMiddleware.js";
import { addReviews, getReviews } from "../controllers/ReviewsController.js";

const router = express.Router();

router.post("/add-review/:id", VerifyToken, addReviews);
router.get("/get-reviews/:id", VerifyToken, getReviews);

export default router;
