import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserDetails } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserDetails);

export default userRouter;