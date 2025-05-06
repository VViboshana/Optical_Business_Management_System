import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserDetails, updateProfile } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserDetails);
userRouter.put('/update-profile', userAuth, updateProfile);

export default userRouter;