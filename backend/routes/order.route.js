//Salini
const express = require("express");
const { createAOrder } = require("./order.controller");
const router = express.Router();

//Create order endpoint
router.post("/", createAOrder);

module.exports = router;
