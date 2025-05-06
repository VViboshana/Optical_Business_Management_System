// linara
import express from 'express';
import { 
  createAppointment, 
  getAllAppointments, 
  getAppointmentById, 
  cancelAppointment, 
  bookAppointment,
  getAppointmentsByUser 
} from '../controllers/appointmentController.js';

const router = express.Router();

// Create a new appointment
router.post('/', createAppointment);

// Book a new appointment
router.post('/book', bookAppointment);

// Get all appointments or appointments by email
router.get('/', getAllAppointments);

// Get appointments by user email
router.get('/user/:email', getAppointmentsByUser);

// Get appointment by ID
router.get('/:id', getAppointmentById);

// Cancel an appointment
router.delete('/:id', cancelAppointment);

export default router;
