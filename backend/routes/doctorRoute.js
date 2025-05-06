// linara
import express from 'express';
import Doctor from '../models/doctorModel.js';
import { addDoctor, getAllDoctors, getDoctorById } from '../controllers/doctorController.js';

const doctorRoutes = express.Router();

doctorRoutes.post("/add-doctor", addDoctor);
doctorRoutes.get("/", getAllDoctors);
doctorRoutes.get("/:id", getDoctorById);

export default doctorRoutes;

