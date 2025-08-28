import express from 'express';
import { getVerifiedUsers, getUserById } from '../controller/userController.js';
const router = express.Router();

router.get('/', getVerifiedUsers);
router.get('/:id', getUserById);

export default router;
