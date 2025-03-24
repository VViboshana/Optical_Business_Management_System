import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Header = () => {
  const navigate = useNavigate();

  return (
    
    <div className="flex flex-col md:flex-row bg-primary p-6 md:p-10 lg:p-20 rounded-lg">
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto">

        <p className="text-3xl md:text-4xl text-white font-semibold">Book Appointment <br /> with Trusted Doctors</p>
        <p className="text-sm text-white font-light">Browse through our list of trusted doctors and schedule your appointment hassle-free.</p>

        <button onClick={() => navigate('/doctors')}
        className="bg-white text-gray-600 text-sm px-8 py-3 rounded-full mt-4 hover:scale-105 transition-transform">Book Appointment
        </button>
        
      </div>

      <div className="md:w-1/2 flex justify-center items-center">
        <img className="w-full h-auto rounded-lg" src={assets.header_img} alt="Header Image" />
      </div>

    </div>
  );
};

export default Header;
