import express from 'express';
import { emailSignUpController, emailLoginController, emailVerificationController, forgetPasswordController, ResetPassword } from '../controller/authController.js';
const router = express.Router();

router.post('/signup', emailSignUpController);
router.post('/login', emailLoginController);
router.get('/verify-email', emailVerificationController);
router.post('/forgot-password' , forgetPasswordController);
router.put('/reset-password', ResetPassword);

export default router;