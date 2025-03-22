import React from 'react';

const ProfileNavigation = ({ setActiveTab }) => {
  return (
    <div className="mt-4">
      <button
        onClick={() => setActiveTab('profile')}
        className="block w-full text-left py-2 px-4 hover:bg-gray-200"
      >
        Profile
      </button>
      <button
        onClick={() => setActiveTab('appointments')}
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
      <button
        onClick={() => setActiveTab('support')}
        className="block w-full text-left py-2 px-4 hover:bg-gray-200"
      >
        Support
      </button>
    </div>
  );
};

export default ProfileNavigation;