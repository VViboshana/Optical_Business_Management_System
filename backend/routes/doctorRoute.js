//linara
const express = require('express')
const Doctor = require("../models/doctorModel");
const { addDoctor, getAllDoctors,getDoctorById } = require('../controllers/doctorController');
const doctorRoutes = express.Router();

doctorRoutes.post("/add-doctor",addDoctor)
doctorRoutes.get("/",getAllDoctors)
doctorRoutes.get("/:id", getDoctorById);
  

module.exports=doctorRoutes;

