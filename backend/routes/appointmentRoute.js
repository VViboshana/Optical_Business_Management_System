//linara
const express = require('express');
const Appointment = require("../models/appointmentModel");
const { createAppointment,getAllAppointments,getAppointmentById,CancelAppointment} =require('../controllers/appointmentController');
const appointmentRoutes = express.Router();


appointmentRoutes.post('/book-appointment', createAppointment);
appointmentRoutes.get('/appointments', getAllAppointments);
appointmentRoutes.get('/appointments/:id', getAppointmentById);
appointmentRoutes.delete('/appointments//:id', CancelAppointment);

module.exports=appointmentRoutes;



