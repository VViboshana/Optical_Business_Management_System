// linara
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required'],
    enum: ['Optometrist', 'Ophthalmologist'],
  },
  experience: {
    type: Number,
    required: [true, 'Experience is required'],
    min: [0, 'Experience cannot be negative'],
  },
  fee: {
    type: Number,
    required: [true, 'Fee is required'],
    min: [0, 'Fee cannot be negative'],
  },
  serviceCharge: {
    type: Number,
    required: [true, 'Service charge is required'],
    default: 500,
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  availableDays: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  }],
  workingHours: {
    start: {
      type: String,
      required: [true, 'Start time is required'],
    },
    end: {
      type: String,
      required: [true, 'End time is required'],
    },
  },
  slots: [{
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
}, {
  timestamps: true,
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
