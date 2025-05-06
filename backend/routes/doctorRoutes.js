import express from 'express';
import { getAllDoctors, getDoctorById, createDoctor } from '../controllers/doctorController.js';

const router = express.Router();

// Get all doctors
router.get('/', getAllDoctors);

// Get doctor by ID
router.get('/:id', getDoctorById);

// Create a new doctor
router.post('/', createDoctor);

export default router; 