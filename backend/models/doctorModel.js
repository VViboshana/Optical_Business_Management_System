//linara 2
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({

    name: {type: String,required: true,},
    specialization: {type: String,required: true,},
    availability: {type: Array,required: true,},
    experience: {type: Number,required: true,},
    doctorImage: {type: String,required: true,},
    about: {type: String,required: true,},
    fee: {type: Number,required: true,},
    serviceCharge: {type: Number,required: true,},
    //createdAt: {type: Date,default: Date.now,},
    date: { type: Number, required: true },
    slots: { type: Object, default: {}, },

}, {timestamps: true,} );

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;






