// backend/controllers/appointmentController.js
import { Appointment } from '../models/appointmentModel.js';

export const createAppointment = async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    const newAppointment = new Appointment({
      name,
      email,
      phone,
      address,
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', data: newAppointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error booking appointment', error: error.message });
  }
};
//


