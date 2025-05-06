//linara
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../../context/AppContext';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const navigate = useNavigate();
  const { backendUrl, userData } = useContext(AppContent);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!userData?.email) {
          setError('Please sign in to view appointments');
          setIsLoading(false);
          return;
        }

        const response = await fetch(`${backendUrl}/api/appointments?email=${userData.email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        
        const data = await response.json();
        if (data.success) {
          setAppointments(data.data || []);
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch appointments');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError(error.message || 'Failed to fetch appointments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [backendUrl, userData]);

  const handleCancel = async (appointmentId) => {
    setAppointmentToDelete(appointmentId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!appointmentToDelete) return;

    try {
      const response = await fetch(`${backendUrl}/api/appointments/${appointmentToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      
      if (response.ok && data.success) {
        setAppointments(prevAppointments =>
          prevAppointments.filter(appointment => appointment._id !== appointmentToDelete)
        );
        alert('Appointment deleted successfully.');
      } else {
        throw new Error(data.message || 'Failed to delete appointment');
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert(error.message || 'Something went wrong. Please try again.');
    } finally {
      setShowDeleteConfirm(false);
      setAppointmentToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setAppointmentToDelete(null);
  };

  const handleInvoice = (appointment) => {
    navigate('/receipt', { state: { appointment } });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userData?.email) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600 mb-4">Please sign in to view your appointments</p>
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Sign In
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Sign In
        </button>
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Profile
        </button>
        <h2 className="text-3xl font-extrabold text-center text-black">My Appointments</h2>
        <div className="w-24"></div> {/* Empty div for spacing */}
      </div>
      <div className="space-y-10">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="border p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
            <p className="text-lg text-gray-700"><strong>Doctor's Name:</strong> {appointment.doctorName}</p>
            <p className="text-lg text-gray-700"><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
            <p className="text-lg text-gray-700"><strong>Time Slot:</strong> {appointment.slot}</p>
            <p className="text-lg text-gray-700"><strong>Total Fee: </strong>{appointment.totalFee}</p>

            <div className="mt-6 flex justify-end gap-5">
              {appointment.status !== 'cancelled' ? (
                <button 
                  className="bg-red-500 text-white px-5 py-3 rounded-lg transform transition-all duration-300 hover:scale-105"
                  onClick={() => handleCancel(appointment._id)}
                >
                  Cancel Appointment 
                </button>
              ) : (
                <button className="bg-gray-400 text-white px-5 py-3 rounded-lg shadow-md cursor-not-allowed" disabled>
                  Cancelled
                </button>
              )}
              <button 
                className="bg-green-500 text-white px-5 py-3 rounded-lg transform transition-all duration-300 hover:scale-105"
                onClick={() => handleInvoice(appointment)}
              >
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation part */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this appointment? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;

