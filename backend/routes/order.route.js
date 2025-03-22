const express = require('express');
const { validateCreateOrder, validateOrderByEmail } = require("../middlewares/orderValidation");
const { createAOrder, getOrderByEmail } = require('../controllers/order.controller');
const router = express.Router();

router.post("/", validateCreateOrder, createAOrder);

router.get("/", validateOrderByEmail, getOrderByEmail);

module.exports = router;