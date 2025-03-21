import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; // Import the context

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0); // Default to first available date
  const [slotTime, setSlotTime] = useState('');

  const { currencySymbol } = useContext(AppContext); // Access the currency symbol

  useEffect(() => {
    // Fetch doctor details
    const fetchDocInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/${docId}`); // Ensure correct backend endpoint
        const data = await response.json();
        setDocInfo(data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDocInfo();
  }, [docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  const getAvailableSlots = () => {
    let today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let startTime = new Date(currentDate);
      startTime.setHours(7, 0, 0, 0);
      let endTime = new Date(currentDate);
      endTime.setHours(17, 0, 0, 0);

      let timeSlots = [];
      while (startTime < endTime) {
        let formattedTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        timeSlots.push({
          datetime: new Date(startTime),
          time: formattedTime
        });

        startTime.setMinutes(startTime.getMinutes() + 30);
      }

      if (i === 0) {
        const currentDateTime = new Date();
        timeSlots = timeSlots.filter(slot => slot.datetime > currentDateTime);
      }

      slots.push(timeSlots);
    }
    setDocSlots(slots);
  };

  return docInfo ? (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt={docInfo.name} />
        </div>

        <div className='flex-1 border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name}</p>

          <div className='text-sm mt-1 text-gray-600'>
            <p>{docInfo.specialization}</p>
          </div>

          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fee}</span>
          </p>
          <p className='text-gray-500 font-medium mt-4'>
            Service Charge: <span className='text-gray-600'>{currencySymbol}{docInfo.fee}</span>
          </p>
        </div>
      </div>

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>

        {/* Date Selection */}
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (
              <div
                onClick={() => {
                  setSlotIndex(index);
                  setSlotTime('');
                }}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index ? 'bg-primary text-white' : 'border-gray-200'
                }`}
                key={index}
              >
                <p>{`${item[0]?.datetime.getDate()}, ${item[0]?.datetime.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}`}</p>
              </div>
            ))}
        </div>

        {/* Time Slots - Always Visible */}
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length > 0 &&
            docSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border-gray-300'
                }`}
                key={index}
              >
                {item.time}
              </p>
            ))}
        </div>

        {/* Book Appointment Button - Disabled until both date and time are selected */}
        <button
          onClick={() => navigate('/patient-details')}
          disabled={!slotTime} // Disable if no time is selected
          className={`text-sm font-light px-14 py-3 rounded-full my-6 ${
            slotTime ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Book Appointment
        </button>
      </div>
    </div>
  ) : (
    <p>Loading doctor details...</p>
  );
};

export default Appointment;
