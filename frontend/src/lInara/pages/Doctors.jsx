import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../../context/AppContext';

const Doctors = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent);

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { //fetch doctors from api
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/doctors`);
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data.data);
        setFilteredDoctors(data.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, [backendUrl]);

  // Get unique specializations from doctors
  const specializations = ['all', ...new Set(doctors.map(doctor => doctor.specialization))];

  // Filter doctors based on selected specialization
  const handleSpecializationChange = (e) => {
    const specialization = e.target.value;
    setSelectedSpecialization(specialization);
    
    if (specialization === 'all') {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(doctor => doctor.specialization === specialization);
      setFilteredDoctors(filtered);
    }
  };

  // When a doctor card is clicked, navigate to /appointment/{doctorId}
  const handleDoctorClick = (doctorId) => {
    navigate(`/appointment/${doctorId}`);
  };

  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/Home')}
        className="mb-8 flex items-center text-blue-600 hover:text-blue-700 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Doctors</h1>

      {/* Specialization Filtering */}
      <div className="mb-8">
        <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Specialization
        </label>
        <select
          id="specialization"
          value={selectedSpecialization}
          onChange={handleSpecializationChange}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec.charAt(0).toUpperCase() + spec.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => handleDoctorClick(doctor._id)}
            className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">
                  {doctor.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">{doctor.name}</h2>
                <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                
                <div className="mt-4">
                  <p className="text-gray-600">{doctor.experience} years of experience</p>
                  <p className="text-lg font-semibold text-blue-600 mt-2">
                    Rs. {doctor.fee}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No doctors found for the selected specialization.</p>
        </div>
      )}
    </div>
  );
};

export default Doctors;