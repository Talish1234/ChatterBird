import express from 'express';
import { createMessage } from '../controller/messageController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/createMessage', authMiddleware, createMessage);

export default router;
