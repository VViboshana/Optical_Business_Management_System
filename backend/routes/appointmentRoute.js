// backend/routes/appointmentRoute.js
import express from 'express';
import { createAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

// POST route to create a new appointment
router.post('/book-appointment', createAppointment);

export default router;
