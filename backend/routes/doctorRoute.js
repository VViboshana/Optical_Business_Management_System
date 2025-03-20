const express = require('express')
const Doctor = require("../models/doctorModel");
const { addDoctor, getAllDoctors, updateDoctor } = require('../controllers/doctorController');
const doctorRoutes = express.Router();

doctorRoutes.post("/add-doctor",addDoctor)
doctorRoutes.get("/",getAllDoctors)
doctorRoutes.put("/update/:id",updateDoctor)

module.exports=doctorRoutes;