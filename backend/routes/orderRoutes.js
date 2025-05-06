//Salini
const express = require("express");
const { createAOrder } = require("../controllers/orderController");
const router = express.Router();

//Create order endpoint
router.post("/", createAOrder);

module.exports = router;
