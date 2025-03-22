//linara
const Doctor = require("../models/doctorModel");


// Add a new doctor
const addDoctor = async (req, res) => {
  try {
    const { name, specialization, experience, about, fee, serviceCharge, date, slot } = req.body;
        
        // Create a new doctor document
        const newDoctor = new Doctor({
            name,
            specialization,
            experience,
            about,
            fee,
            serviceCharge,
            date,
            slot,
        });

    const savedDoctor = await newDoctor.save();  // Save doctor to DB
    
    res.status(200).send({ message: "Doctor added successfully", doctor: savedDoctor });
  } catch (error) {
    console.error("Error adding doctor", error);  // Log the exact error for debugging
    res.status(500).send({ message: "Failed to add doctor", error: error.message });
  }
};

  // Get all doctors
  const getAllDoctors = async (req, res) => {
    try {
      const doctors = await Doctor.find().sort({ createdAt: -1 });
      res.status(200).send(doctors);
    } catch (error) {
      console.error("Error fetching doctors", error);
      res.status(500).send({ message: "Failed to fetch doctors" });
    }
  };
  
  // Update doctor data
  const updateDoctor = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedDoctor) {
        return res.status(404).send({ message: "Doctor not found!" });
      }
      res.status(200).send({
        message: "Doctor updated successfully",
        doctor: updatedDoctor
      });
    } catch (error) {
      console.error("Error updating doctor", error);
      res.status(500).send({ message: "Failed to update doctor" });
    }
  };

  // Get doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    
    if (!doctor) {
      return res.status(404).send({ message: "Doctor not found!" });
    }
    
    res.status(200).send(doctor);
  } catch (error) {
    console.error("Error fetching doctor by ID", error);
    res.status(500).send({ message: "Failed to fetch doctor" });
  }
};
  
  module.exports = {addDoctor,getAllDoctors,updateDoctor,getDoctorById};
  