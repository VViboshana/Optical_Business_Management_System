//linara
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String,required: true,},
  email: { type: String, required: true,},
  phone: {type: String,required: true,},
  address: {type: String, required: true,},
  paymentMethod: {type: String,enum: ['Cash', 'Card'],required: true,},

  docId: { type: String, required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  
},
 { timestamps: true });  

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;



