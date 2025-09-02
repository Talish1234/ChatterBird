import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createLog, getAllLogs, updateLog } from "../controller/callLogController.js";
const router = express.Router();

router.get('/get-all-logs', authMiddleware, getAllLogs);
router.post('/create', authMiddleware, createLog);
router.put('/:id',authMiddleware, updateLog);

export default router;