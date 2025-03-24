import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContent } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const {userData} = useContext(AppContent);
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/login'); // Navigate to the sign-up page
  };

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
        <img src={assets.header_img} alt=""
        className=''/>

        <h1 className='flex items-center gap-2 text-x1 sm:text-3xl 
        font-medium mb-2'>Hey {userData ? userData.name : 'Users' }!
        <img className='w-8 aspect-squre' src={assets.hand_wave} alt=''/>
        </h1>
        
        <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our Websit</h2>

        <p className='mb-8 max-w-md'>Let's start with a quick product tour 
            and we will have you up and running in no time</p>

            <button 
        onClick={handleGetStartedClick} // Use the click handler
        className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>
        Get Started
      </button>
        <p></p>
    </div>
  )
}

export default Header