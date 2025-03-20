import express from 'express'
import { login, logout, register, sendVerifyOtp, verifyEmail, isAccountVerified, sendResetOtp, resetPassword } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.post('/is-auth', userAuth, isAccountVerified);
authRouter.post('/send-resetOtp',sendResetOtp);
authRouter.post('/reset-password', resetPassword);


export default authRouter;