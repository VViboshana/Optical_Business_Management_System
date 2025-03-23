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
  }, []); 

  const handleCancel = (appointmentId) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment._id === appointmentId
          ? { ...appointment, canceled: true } // Mark as canceled
          : appointment
      )
    );
  };


  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-center text-xl text-gray-600">No appointments found.</p>) : (
        <div className="space-y-6">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="border p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
              <p className="text-lg text-gray-700"><strong>Doctor's Name:</strong> {appointment.doctorName}</p>
              <p className="text-lg text-gray-700"><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
              <p className="text-lg text-gray-700"><strong>Time Slot:</strong> {appointment.slot}</p>
              <p className="text-lg text-gray-700"><strong>Total Fee: </strong>{appointment.totalFee}</p>

              <div className="mt-6 flex justify-center">
                {!appointment.canceled ? (
                  <button
                    className="bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-600 transform transition-all duration-300 ease-in-out hover:scale-105"
                    onClick={() => handleCancel(appointment._id)} 
                  >
                    Cancel Appointment
                  </button>
                ) : (
                  <button
                    className="bg-gray-400 text-white px-6 py-3 rounded-md shadow-md cursor-not-allowed"
                    disabled
                  >
                    Cancelled
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
