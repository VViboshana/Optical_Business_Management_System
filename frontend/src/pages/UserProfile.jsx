import React, { useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import ProfileNavigation from '../components/ProfileNavigation';
import AppointmentHistory from './AppointmentHistory';
import OrderHistory from './OrderHistory';
import ProfileSettings from './ProfileSettings';
import Inquiries from './Inquiries';
import Support from './Support';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile'); // Default tab

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appointments':
        return <AppointmentHistory />;
      case 'orders':
        return <OrderHistory />;
      case 'profile':
        return <ProfileSettings />;
      case 'inquiries':
        return <Inquiries />;
      case 'support':
        return <Support />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white p-4">
        <ProfileHeader />
        <ProfileNavigation setActiveTab={setActiveTab} />
      </div>
      <div className="flex-1 p-4">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default UserProfile;