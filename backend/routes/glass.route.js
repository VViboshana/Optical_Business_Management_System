//Kumod
const express = require("express");
const Glass = require("../models/glass.model");
const {
  postAGlass,
  getAllGlasses,
  getSingleGlass,
  UpdatedGlass,
  deleteAGlass,
  getListings,
} = require("../controllers/glass.controller");
const router = express.Router();

//frontend -> backend server -> controller -> book schema -> database -> send to server -> back to the front end

//post a glass
router.post("/create-glass", postAGlass);

//get all glasses
router.get("/", getAllGlasses);

//single glass endpoint
router.get("/:id", getSingleGlass);

//update glass endpoint
router.put("/edit/:id", UpdatedGlass);

//delete glass
router.delete("/:id", deleteAGlass);

module.exports = router;
