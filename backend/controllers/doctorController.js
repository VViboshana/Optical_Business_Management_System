//linara
const Doctor = require("../models/doctorModel");

// Add a new doctor
const addDoctor = async (req, res) => {
  try {
    const { name, specialization, experience, about, fee, serviceCharge, date, slot } = req.body;
        
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

    const savedDoctor = await newDoctor.save();  
    
    res.status(200).send({ message: "Doctor added successfully", doctor: savedDoctor });
  } catch (error) {
    console.error("Error adding doctor", error); 
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
  
  module.exports = {addDoctor,getAllDoctors,getDoctorById};
  
