//linara
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String,required: true,},
  email: { type: String, required: true,},
  phone: {type: String,required: true,},
  address: {type: String, required: true,},
  paymentMethod: {type: String,enum: ['Cash', 'Card'],required: true,},

  docId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },  // Add the date field to store the appointment date
  slot: { type: String, required: true }, // Store the selected slot as a string
  doctorName: { type: String,required: true,},

  totalFee: {type: Number,required: true,},


},
 );  

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;



