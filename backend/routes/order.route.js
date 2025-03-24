const express = require('express');
const { validateCreateOrder, validateOrderByEmail } = require("../middlewares/orderValidation");
const { createAOrder, getOrderByEmail, getOneOrderById } = require('../controllers/order.controller');
const router = express.Router();

router.post("/", validateCreateOrder, createAOrder);

router.get("/", validateOrderByEmail, getOrderByEmail);

router.get("/:id", getOneOrderById );

module.exports = router;