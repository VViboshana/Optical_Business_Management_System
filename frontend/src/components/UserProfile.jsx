import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import UserAppointments from './UserAppointments';

const UserProfile = () => {
  const navigate = useNavigate();
  const { userData, backendUrl } = useContext(AppContent);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userData?.email) {
      navigate('/login');
    }
  }, [userData, navigate]);

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Please sign in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate('/Home')}
        className="mb-6 flex items-center text-blue-500 hover:text-blue-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Home
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{userData.name || 'User'}</h2>
            <p className="text-gray-600">{userData.email}</p>
            {userData.phone && <p className="text-gray-600">{userData.phone}</p>}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Your Appointments</h3>
          <UserAppointments />
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 