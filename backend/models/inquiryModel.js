import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  reply: {
    type: String,
    default: '',
  },
  repliedAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['pending', 'replied'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry; 