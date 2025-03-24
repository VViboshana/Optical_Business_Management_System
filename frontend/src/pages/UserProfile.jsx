import React, { useState, useEffect } from 'react';
import { FaSun, FaRegCommentDots } from 'react-icons/fa';
import ProfileNavigation from '../components/ProfileNavigation';
import AppointmentHistory from './AppointmentHistory';
import OrderHistory from './OrderHistory';
import ProfileSettings from './ProfileSettings';
import Inquiries from './Inquiries';
import Support from './Support';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NavBar from '../components/NavBar3';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [dateTime, setDateTime] = useState(new Date());
  const [profilePicture, setProfilePicture] = useState("your-profile-picture-url.jpg");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const user = {
    name: "Vihaga",
    email: "vihagaviboshana549@gmail.com",
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles([...uploadedFiles, ...files.map(file => file.name)]);
  };

  const data = [
    { name: 'Jan', trips: 30, revenue: 4000 },
    { name: 'Feb', trips: 20, revenue: 3000 },
    { name: 'Mar', trips: 50, revenue: 5000 },
    { name: 'Apr', trips: 40, revenue: 4500 },
  ];

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
    <div className="flex flex-col h-screen bg-gray-100">
  {/* NavBar */}
  <NavBar />

  <div className="flex flex-1">
    {/* Sidebar */}
    <div className="w-72 bg-white shadow-lg p-4">
      <div className="flex items-center space-x-4">
        <label className="cursor-pointer relative">
          <input type="file" accept="image/*" className="hidden" onChange={handleProfilePictureChange} />
          <img
            src={profilePicture}
            alt="User "
            className="rounded-full w-12 h-12 border-2 border-gray-300 hover:opacity-75"
          />
        </label>
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <ProfileNavigation setActiveTab={setActiveTab} />
    </div>

    {/* Main Content */}
    <div className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-md">
        <div className="flex items-center space-x-4">
          <FaSun className="text-yellow-500" />
          <span>{dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}</span>
        </div>
        <FaRegCommentDots className="text-gray-600 cursor-pointer" />
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-white p-4 shadow rounded-md text-center">
          <h3 className="text-xl font-semibold">50</h3>
          <p className="text-sm text-gray-500">Completed Trips</p>
        </div>
        <div className="bg-white p-4 shadow rounded-md text-center">
          <h3 className="text-xl font-semibold">08</h3>
          <p className="text-sm text-gray-500">Upcoming Trips</p>
        </div>
        <div className="bg-white p-4 shadow rounded-md text-center">
          <h3 className="text-xl font-semibold">10</h3>
          <p className="text-sm text-gray-500">Cancelled Trips</p>
        </div>
      </div>

      {/* Charts & Graphs */}
      <div className="mt-6 bg-white p-6 shadow rounded-md">
        <h2 className="text-lg font-semibold mb-4">Performance Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="trips" stroke="#8884d8" />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* File Upload for Medical Reports */}
      <div className="mt-6 bg-white p-6 shadow rounded-md">
        <h2 className="text-lg font-semibold mb-4">Upload Medical Reports</h2>
        <input type="file" multiple accept=".pdf,.jpg,.png,.docx" onChange={handleFileUpload} className="block w-full p-2 border rounded-md" />
        <ul className="mt-4">
          {uploadedFiles.map((file, index) => (
            <li key={index} className="text-sm text-gray-600">{file}</li>
          ))}
        </ul>
      </div>

      {/* Booking Summary */}
      <div className="mt-6 bg-white p-6 shadow rounded-md">
        <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>
        {renderTabContent()}
      </div>
    </div>
  </div>
</div>
  )
};

export default UserProfile;
