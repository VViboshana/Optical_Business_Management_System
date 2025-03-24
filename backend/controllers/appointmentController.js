//linara
const Appointment = require("../models/appointmentModel.js");

//Add a new appointment
const createAppointment = async (req, res) => {
  try {
    const { name, email, phone, address, paymentMethod, doctorId, doctorName, date, slot, totalFee} = req.body;
    // Create a new appointment
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

    res.status(201).send({ message: 'Appointment booked successfully', data: appointment });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error booking appointment', error: error.message });
  }
};

 // Get all appointments
  const getAllAppointments = async (req, res) => {
    try {
      const appointments = await Appointment.find();
      res.status(200).json(appointments);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
};

// Get appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).send({ message: "Appointment not found!" });
    }

    res.status(200).send(appointment);
  } catch (error) {
    console.error("Error fetching appointment by ID", error);
    res.status(500).send({ message: "Failed to fetch appointment" });
  }
};

//cancel an appointment
const CancelAppointment = async (req, res) => {
  try {
    const canceledAppointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!canceledAppointment) {
      return res.status(404).send({ message: 'Appointment not found' });
    }

    res.status(200).send({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error deleting appointment', error: error.message });
  }
};

module.exports = {createAppointment,getAllAppointments,getAppointmentById,CancelAppointment};



