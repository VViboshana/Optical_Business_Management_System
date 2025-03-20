import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  useEffect(() => {
    // Set all doctors in filterDoc
    setFilterDoc(doctors);
  }, [doctors]);

  return (
    <div>
      <p className='text-gray-600'>Browse through doctors</p>
      
      <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
        {
          filterDoc.map((item) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
              key={item._id}
            >
              <img className='bg-gray-200' src={item.image} alt={item.name} />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-900 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Doctors;
