import express from "express";
import { openChat } from "../controller/chatController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/open', authMiddleware, openChat);

export default router;