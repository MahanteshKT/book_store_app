import express from "express";
import { VerifyToken } from "../middleware/AuthMiddleware.js";
import { addTransition } from "../controllers/TransitionControllers.js";
const router = express.Router();

router.post("/add-transactions", VerifyToken, addTransition);

export default router;
