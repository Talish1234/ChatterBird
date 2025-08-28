import express from 'express';
import { emailSignUpController, emailLoginController, emailVerificationController } from '../controller/authController.js';
const router = express.Router();

router.post('/signup', emailSignUpController);
router.post('/login', emailLoginController);
router.get('/verify-email', emailVerificationController);
export default router;