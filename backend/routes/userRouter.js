import express from 'express';
import { getVerifiedUsers, getUserById, updateUser } from '../controller/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import upload from '../utils/multer.js'
const router = express.Router();

router.get('/', authMiddleware ,getVerifiedUsers);
router.get('/:id', getUserById);
router.put('/update', authMiddleware, upload.single('image'), updateUser);
export default router;

