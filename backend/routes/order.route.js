import express from 'express';
import { validateCreateOrder, validateOrderByEmail } from '../middleware/orderValidation.js';
import { createAOrder, getOrderByEmail, getOneOrderById, updateOrderStatus } from '../controllers/order.controller.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

router.post("/", userAuth, validateCreateOrder, createAOrder);

router.get("/", userAuth, validateOrderByEmail, getOrderByEmail);

router.get("/:id", userAuth, getOneOrderById );

router.patch("/:id/status", userAuth, updateOrderStatus);

export default router;