import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContent } from '../context/AppContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!backendUrl) {
      setError('Backend URL is not configured');
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching appointments from:', `${backendUrl}/api/appointments`);
        const res = await axios.get(`${backendUrl}/api/appointments`);
        console.log('Appointments response:', res.data);
        
        if (res.data.success) {
          const sortedAppointments = res.data.data.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          });
          setAppointments(sortedAppointments);
        } else {
          setError(res.data.message || 'Failed to fetch appointments');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError(error.response?.data?.message || 'Failed to fetch appointments');
      } finally {
        setLoading(false);
      }
    };
  
    fetchAppointments();
  }, [backendUrl]);

  const downloadAppointmentsReport = () => {
    const headers = ['Patient Name', 'Doctor', 'Date', 'Time Slot', 'Total Amount'];
    const csvContent = [
      headers.join(','),
      ...appointments.map(appt => [
        `"${appt.name}"`,
        `"${appt.doctorName}"`,
        `"${new Date(appt.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}"`,
        `"${appt.slot}"`,
        `"Rs. ${appt.totalFee || 0}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `appointments_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-400 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Admin Dashboard</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Add Doctor Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Add New Doctor</h3>
              <p className="text-gray-600 mb-6">
                Add a new doctor to the system with their details, specialization, and availability.
              </p>
              <button
                onClick={() => navigate('/add-doctor')}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Add Doctor
              </button>
            </div>

            {/* Manage Inquiries Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Manage Inquiries</h3>
              <p className="text-gray-600 mb-6">
                View and respond to customer inquiries and messages.
              </p>
              <button
                onClick={() => navigate('/manage-inquiries')}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                View Inquiries
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Manage Inventory</h3>
              <p className="text-gray-600 mb-6">
                Check and Manage Inventory and Categories
              </p>
              <button
                onClick={() => navigate('/InventoryDashboard')}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                View Inventory
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Manage Glasses</h3>
              <p className="text-gray-600 mb-6">
                Check and Manage Glasses
              </p>
              <button
                onClick={() => navigate('/glassDashboard')}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                View Glasses
              </button>
            </div>

            {/* Appointments */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow col-span-1 md:col-span-2">
              <h3 className="text-xl font-semibold mb-4">Appointments</h3>
              
              {appointments.length === 0 ? (
                <p className="text-gray-600">No appointments yet.</p>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-left border border-gray-300">Patient Name</th>
                          <th className="px-4 py-2 text-left border border-gray-300">Doctor</th>
                          <th className="px-4 py-2 text-left border border-gray-300">Date</th>
                          <th className="px-4 py-2 text-left border border-gray-300">Time Slot</th>
                          <th className="px-4 py-2 text-left border border-gray-300">Total Fee</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map((appt) => (
                          <tr key={appt._id}>
                            <td className="border border-gray-300 px-4 py-2">{appt.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{appt.doctorName}</td>
                            <td className="border border-gray-300 px-4 py-2">
                              {new Date(appt.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{appt.slot}</td>
                            <td className="border border-gray-300 px-4 py-2">Rs. {appt.totalFee || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={downloadAppointmentsReport}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Download Report
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 