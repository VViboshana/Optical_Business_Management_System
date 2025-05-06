// linara
import Doctor from "../models/doctorModel.js";

// Add a new doctor
export const addDoctor = async (req, res) => {
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
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({
      success: true,
      message: 'Doctors fetched successfully',
      data: doctors
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctors',
      error: error.message
    });
  }
};

// Get a single doctor
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Doctor fetched successfully',
      data: doctor
    });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctor',
      error: error.message
    });
  }
};

// Create a new doctor
export const createDoctor = async (req, res) => {
  try {
    const {
      name,
      specialization,
      experience,
      fee,
      image,
      description,
      availableDays,
      workingHours
    } = req.body;

    // Validate required fields
    if (!name || !specialization || !experience || !fee || !image || !description || !availableDays || !workingHours) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate working hours
    if (!workingHours.start || !workingHours.end) {
      return res.status(400).json({
        success: false,
        message: 'Working hours are required'
      });
    }

    const doctor = new Doctor({
      name,
      specialization,
      experience,
      fee,
      image,
      description,
      availableDays,
      workingHours
    });

    await doctor.save();

    res.status(201).json({
      success: true,
      message: 'Doctor added successfully',
      data: doctor
    });
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add doctor',
      error: error.message
    });
  }
};

// Update a doctor
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const doctor = await Doctor.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Doctor updated successfully',
      data: doctor
    });
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update doctor',
      error: error.message
    });
  }
};

// Delete a doctor
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findByIdAndDelete(id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Doctor deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete doctor',
      error: error.message
    });
  }
};
