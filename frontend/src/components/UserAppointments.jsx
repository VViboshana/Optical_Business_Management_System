import React, { useState, useEffect, useContext } from 'react';
import { AppContent } from '../context/AppContext';

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { backendUrl, userData } = useContext(AppContent);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (userData?.email) {
          const response = await fetch(`${backendUrl}/api/appointments?email=${userData.email}`);
          const data = await response.json();
          
          if (data.success) {
            setAppointments(data.data);
          } else {
            console.error('Error fetching appointments:', data.message);
          }
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [backendUrl, userData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userData?.email) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600">Please sign in to view your appointments</p>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600">No appointments found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{appointment.doctorName}</h3>
                <p className="text-gray-600">
                  {new Date(appointment.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-gray-600">Time: {appointment.slot}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  appointment.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : appointment.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {appointment.status}
              </span>
            </div>
            <div className="mt-2">
              <p className="text-gray-600">Fee: Rs. {appointment.totalFee}</p>
              <p className="text-gray-600">Payment Method: {appointment.paymentMethod}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAppointments; 