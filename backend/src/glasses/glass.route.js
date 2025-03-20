//Kumod
const express = require('express')
const Glass = require('../glasses/glass.model');
const { postAGlass, getAllGlasses, getSingleGlass } = require('./glass.controller');
const router = express.Router();

//frontend -> backend server -> controller -> book schema -> database -> send to server -> back to the front end

//post a glass
router.post("/create-glass",postAGlass)

//get all glasses
router.get("/",getAllGlasses)

//single glass endpoint
router.get("/:id",getSingleGlass)

//update glass endpoint

module.exports=router;