const Doctor = require("../models/doctorModel");

// Add a new doctor
const addDoctor = async (req, res) => {
    try {
      const newDoctor = new Doctor({ ...req.body });
      await newDoctor.save();
      res.status(200).send({ message: "Doctor added successfully", doctor: newDoctor });
    } catch (error) {
      console.error("Error adding doctor", error);
      res.status(500).send({ message: "Failed to add doctor" });
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
  
  module.exports = {
      addDoctor,
    getAllDoctors,
    updateDoctor
  };
  