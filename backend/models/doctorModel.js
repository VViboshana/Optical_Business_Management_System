//linara
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({

    name: {type: String,required: true,},
    specialization: {type: String,required: true,},
    
    image:{type:String,required:true},

    experience: {type: Number,required: true,},
    about: {type: String,required: true,},
    fee: {type: Number,required: true,},
    serviceCharge: {type: Number,required: true,},
    date: { type: Number, required: true },
    slot: { type: Object, default: {} },

}, );

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;