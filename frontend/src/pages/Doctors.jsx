import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();
  

  

  useEffect(() => {
    // Fetch doctors
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/'); 
        const data = await response.json();
        setFilterDoc(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div>
      <p className='text-gray-600'>Browse through doctors</p>
      
      <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
        {
          filterDoc.map((docId) => (
            <div
              onClick={() => navigate(`/appointment/${docId._id}`)}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
              key={docId._id}
            >
              <img className='bg-gray-200' src={docId.image} alt={docId.name} />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{docId.name}</p>
                <p className='text-gray-900 text-sm'>{docId.speciality}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Doctors;
//