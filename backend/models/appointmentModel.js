//linara
const mongoose = require('mongoose');

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

  timeSlot: {
    type: String, // Example: "10:30 AM - 11:00 AM"
    required: true,
  },

  paymentMethod: {
    type: String,
    enum: ['Cash', 'Card'],
    required: true,
  },

  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
  
},
 { timestamps: true });  

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
