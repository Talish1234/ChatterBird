import express from 'express';
import { googleSignUpController } from './../controller/authController.js';

const router = express.Router();

router.post('/signup', googleSignUpController);

export default router;