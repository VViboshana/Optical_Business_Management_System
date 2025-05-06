import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileNavigation = ({ setActiveTab }) => {
  const navigate = useNavigate();

  const handleAppointmentHistory = () => {
    navigate('/my-appointments');
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setActiveTab('profile')}
        className="block w-full text-left py-2 px-4 hover:bg-gray-200"
      >
        Profile
      </button>
      <button
        onClick={handleAppointmentHistory}
        className="block w-full text-left py-2 px-4 hover:bg-gray-200"
      >
        Appointment History
      </button>
      <button
        onClick={() => setActiveTab('orders')}
        className="block w-full text-left py-2 px-4 hover:bg-gray-200"
      >
        Order History
      </button>
      <button
        onClick={() => setActiveTab('inquiries')}
        className="block w-full text-left py-2 px-4 hover:bg-gray-200"
      >
        Inquiries
      </button>
    </div>
  );
};

export default ProfileNavigation;