//linara

import React, { useState, useEffect } from 'react';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from the backend
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/appointments');
        const data = await response.json();
        setAppointments(data); // Store the data in state
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found.</p> // Show this message if there are no appointments
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="border p-4 rounded-lg shadow-md">
              <p><strong>Name:</strong> {appointment.name}</p>
              <p><strong>Email:</strong> {appointment.email}</p>
              <p><strong>Phone:</strong> {appointment.phone}</p>
              <p><strong>Address:</strong> {appointment.address}</p>
              <p><strong>Booked At:</strong> {new Date(appointment.createdAt).toLocaleString()}</p>

              <div className="mt-4">
                
                <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-4">
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
