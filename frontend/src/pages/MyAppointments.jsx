//linara
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch appointments from the backend
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/appointments');
        const data = await response.json();
        setAppointments(data); 
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []); 

  const handleCancel = async (appointmentId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmCancel) return;
  
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert('Appointment cancelled successfully.');
  
        setAppointments(prevAppointments =>
          prevAppointments.filter(appointment => appointment._id !== appointmentId)
        );
      } else {
        alert('Failed to cancel appointment.');
      }
    } catch (error) {
      console.error('Error canceling appointment:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  

  const handleInvoice = (appointment) => {
    navigate('/receipt', { state: { appointment } });
  };

  return (
<div >
<h2 className="text-3xl font-extrabold text-center text-black mb-12 mt-12">My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-center text-xl text-gray-600">No appointments found.</p>) : (
        <div className="space-y-10">
          {appointments.map((appointment) => (

            <div key={appointment._id} className="border p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
              <p className="text-lg text-gray-700"><strong>Doctor's Name:</strong> {appointment.doctorName}</p>
              <p className="text-lg text-gray-700"><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
              <p className="text-lg text-gray-700"><strong>Time Slot:</strong> {appointment.slot}</p>
              <p className="text-lg text-gray-700"><strong>Total Fee: </strong>{appointment.totalFee}</p>

              <div className="mt-6 flex justify-end gap-5">
                {!appointment.canceled ? (
                  <button className="bg-red-500 text-white px-5 py-3 rounded-lg transform transition-all duration-300 hover:scale-105"
                  onClick={() => handleCancel(appointment._id)} >Cancel Appointment</button>) 
                  :(<button className="bg-gray-400 text-white px-5 py-3 rounded-lg shadow-md cursor-not-allowed" disabled>Canceled</button>
                )}
                  <button className="bg-green-500 text-white px-5 py-3 rounded-lg transform transition-all duration-300 hover:scale-105"
                  onClick={() => handleInvoice(appointment)}>Download PDF</button> 
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;

