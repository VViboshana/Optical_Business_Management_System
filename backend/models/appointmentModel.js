// linara
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, enum: ['Cash', 'Card'], required: true },
  docId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  slot: { type: String, required: true },
  doctorName: { type: String, required: true },
  totalFee: { type: Number, required: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
