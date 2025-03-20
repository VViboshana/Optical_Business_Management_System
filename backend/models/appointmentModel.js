// backend/models/appointmentsModel.js
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
}, { timestamps: true });  // This will automatically add createdAt and updatedAt

const Appointment = mongoose.model('Appointment', appointmentSchema);

export { Appointment };
