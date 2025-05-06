// linara
import Appointment from "../models/appointmentModel.js";
import Doctor from '../models/doctorModel.js';

// Add a new appointment
export const createAppointment = async (req, res) => {
  try {
    const { name, email, phone, address, paymentMethod, doctorId, doctorName, date, slot, totalFee } = req.body;

    // Check if the slot is already booked
    const existingAppointment = await Appointment.findOne({
      docId: doctorId,
      date: date,
      slot: slot
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked. Please select another slot.'
      });
    }

    const appointment = new Appointment({
      name,
      email,
      phone,
      address,
      paymentMethod,
      docId: doctorId,
      doctorName,
      date,
      slot,
      totalFee,
    });

    await appointment.save();

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: appointment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error booking appointment',
      error: error.message
    });
  }
};

// Get all appointments or appointments by email
export const getAllAppointments = async (req, res) => {
  try {
    const { email } = req.query;
    let query = {};
    
    if (email) {
      query = { email };
    }
    
    const appointments = await Appointment.find(query)
      .sort({ date: -1 })
      .populate('docId', 'name specialization');

    res.status(200).json({
      success: true,
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments'
    });
  }
};

// Get appointment by ID
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Appointment fetched successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointment',
      error: error.message
    });
  }
};

// Cancel an appointment
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete appointment',
      error: error.message
    });
  }
};

// Book a new appointment
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, doctorName, date, time, userEmail, status } = req.body;

    // Validate required fields
    if (!doctorId || !doctorName || !date || !time || !userEmail) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Check if the slot is already booked
    const existingAppointment = await Appointment.findOne({
      docId: doctorId,
      date: date,
      slot: time
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked. Please select another slot.'
      });
    }

    // Find the doctor
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Create new appointment
    const newAppointment = new Appointment({
      doctorId,
      doctorName,
      date,
      time,
      userEmail,
      status: status || 'pending',
      fee: doctor.fee
    });

    // Save the appointment
    await newAppointment.save();

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: newAppointment
    });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to book appointment',
      error: error.message
    });
  }
};

// Get appointments by user email
export const getAppointmentsByUser = async (req, res) => {
  try {
    const { email } = req.params;
    
    const appointments = await Appointment.find({ email })
      .sort({ date: -1 })
      .populate('docId', 'name specialization');

    res.status(200).json({
      success: true,
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments'
    });
  }
};
