import express from 'express';
import { createAppointment } from '../controllers/appointmentController.js';

const router = express.Router();


router.post('/book-appointment', createAppointment);

export default router;
//