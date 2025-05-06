import React from 'react';

const AppointmentHistory = () => {
  // Fetch appointment data from API
  const appointments = [
    { id: 1, date: '2023-10-27', time: '10:00 AM', status: 'Confirmed' },
    // ... more appointments
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Appointment History</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id} className="border p-4 mb-2 rounded">
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            <p>Status: {appointment.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentHistory;