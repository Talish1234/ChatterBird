import express from "express";
import { getUnreadCounts, openChat } from "../controller/chatController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get('/getUnreadCounts', authMiddleware, getUnreadCounts);
router.post('/open', authMiddleware, openChat);

export default router;