import React, { useState, useEffect, useContext } from 'react';
import { FaSun, FaRegCommentDots } from 'react-icons/fa';
import ProfileNavigation from '../components/ProfileNavigation';
import AppointmentHistory from './AppointmentHistory';
import OrderHistory from './OrderHistory';
import ProfileSettings from './ProfileSettings';
import Inquiries from './Inquiries';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NavBar from '../components/NavBar3';
import { AppContent } from '../context/AppContext';
import InquiryList from '../components/InquiryList';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [dateTime, setDateTime] = useState(new Date());
  const { userData, backendUrl, getUserData } = useContext(AppContent);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    profilePicture: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    fetchUserProfile();
    if (!userData?.email) {
      navigate('/login');
    } else {
      fetchInquiries();
      fetchAppointments();
    }
    return () => clearInterval(timer);
  }, [userData, navigate]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/user/data', {
        withCredentials: true
      });
      
      if (response.data.success) {
        const { userData } = response.data;
        setProfileData({
          name: userData.name || '',
          email: userData.email || '',
          profilePicture: userData.profilePicture || ''
        });
      } else {
        toast.error('Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Error fetching profile data');
    }
  };

  const fetchInquiries = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/inquiries/user/${userData.email}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch inquiries');
      }

      setInquiries(data.data || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/appointments/user/${userData.email}`, {
        withCredentials: true
      });
      
      if (response.data.success) {
        setAppointments(response.data.data);
      } else {
        toast.error('Failed to fetch appointment data');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Error fetching appointment data');
    } finally {
      setIsLoadingAppointments(false);
    }
  };

  const getAppointmentData = () => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toLocaleString('default', { month: 'short' });
    }).reverse();

    const monthlyData = last6Months.map(month => {
      const monthAppointments = appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate.toLocaleString('default', { month: 'short' }) === month;
      });

      return {
        name: month,
        appointments: monthAppointments.length,
        completed: monthAppointments.filter(apt => apt.status === 'completed').length,
        cancelled: monthAppointments.filter(apt => apt.status === 'cancelled').length
      };
    });

    return monthlyData;
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
      case 'inquries':
        return <InquiryList />;
      default:
        return <ProfileSettings />;
    }
  };

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
    <div className="flex flex-col h-screen bg-gray-100">
      <NavBar />

      <div className="flex flex-1">
        <div className="w-72 bg-white shadow-lg p-4">
          <div className="flex flex-col items-center space-y-4 p-4">
            <div className="relative">
              <img
                src={profileData.profilePicture || 'https://placehold.co/150x150'}
                alt="Profile"
                className="rounded-full w-24 h-24 object-cover border-4 border-gray-200"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/150x150';
                }}
              />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold">{profileData.name || 'Loading...'}</h2>
              <p className="text-sm text-gray-500">{profileData.email || 'Loading...'}</p>
            </div>
          </div>
          <ProfileNavigation setActiveTab={setActiveTab} />
        </div>

        <div className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-md">
            <div className="flex items-center space-x-4">
              <FaSun className="text-yellow-500" />
              <span>{dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}</span>
            </div>
            <FaRegCommentDots className="text-gray-600 cursor-pointer" />
          </div>

          <div className="mt-6 bg-white p-6 shadow rounded-md">
            <h2 className="text-lg font-semibold mb-4">Appointment Overview</h2>
            {isLoadingAppointments ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getAppointmentData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="appointments" stroke="#8884d8" name="Total Appointments" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="mt-6 bg-white p-6 shadow rounded-md">
            <h2 className="text-lg font-semibold mb-4">Profile Summary</h2>
            {renderTabContent()}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Your Inquiries</h3>
            {isLoading ? (
              <div className="text-center py-4">Loading inquiries...</div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-4 text-gray-500">No inquiries found</div>
            ) : (
              <div className="space-y-4">
                {inquiries.map(inquiry => (
                  <div
                    key={inquiry._id}
                    className={`p-4 rounded-lg border ${
                      inquiry.status === 'replied' ? 'bg-green-50' : 'bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">
                          {new Date(inquiry.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-sm ${
                        inquiry.status === 'replied' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-700">{inquiry.message}</p>
                    {inquiry.reply && (
                      <div className="mt-4 p-3 bg-gray-50 rounded">
                        <p className="text-sm font-medium text-gray-600">Reply:</p>
                        <p className="mt-1 text-gray-700">{inquiry.reply}</p>
                        <p className="mt-2 text-xs text-gray-500">
                          Replied on: {new Date(inquiry.repliedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
