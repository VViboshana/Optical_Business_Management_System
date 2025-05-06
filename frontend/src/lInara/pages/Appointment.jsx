import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContent } from '../../context/AppContext';
import { toast } from 'react-toastify';

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [error, setError] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'Cash'
  });

  const { currencySymbol, backendUrl, userData } = useContext(AppContent);

  // Generate time slots from 9:00 AM to 12:30 PM with 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    const startTime = new Date();
    startTime.setHours(9, 0, 0, 0);
    
    const endTime = new Date();
    endTime.setHours(12, 30, 0, 0);
    
    while (startTime < endTime) {
      slots.push({
        time: startTime.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        isBooked: false
      });
      startTime.setMinutes(startTime.getMinutes() + 30);
    }
    
    return slots;
  };

  // Generate dates for next three days including today
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      dates.push({
        day: date.toLocaleDateString('en-US', { weekday: 'long' }),
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: date.toISOString().split('T')[0],
        times: generateTimeSlots()
      });
    }
    
    return dates;
  };

  useEffect(() => {
    const fetchDocInfo = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${backendUrl}/api/doctors/${docId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch doctor details');
        }
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch doctor details');
        }

        const doctor = data.data;
        setDocInfo(doctor);
        
        // Generate dates and time slots
        const dates = generateDates();
        setDocSlots(dates);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocInfo();
  }, [docId, backendUrl]);

  // Fetch booked slots when active day changes
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!docId || !docSlots[activeDay]?.fullDate) return;

      try {
        const response = await fetch(`${backendUrl}/api/appointments/date/${docSlots[activeDay].fullDate}`);
        if (!response.ok) {
          throw new Error('Failed to fetch booked slots');
        }
        const data = await response.json();
        
        if (data.success) {
          const doctorAppointments = data.data.filter(
            appointment => appointment.doctorId === docId
          );
          const booked = doctorAppointments.map(appointment => appointment.slot);
          setBookedSlots(booked);
        }
      } catch (error) {
        console.error('Error fetching booked slots:', error);
        toast.error('Failed to load booked slots');
      }
    };

    fetchBookedSlots();
  }, [docId, activeDay, docSlots, backendUrl]);

  const handleSlotSelect = (time) => {
    if (!userData?.email) {
      setShowLoginPrompt(true);
      return;
    }
    setSelectedSlot({
      time,
      day: docSlots[activeDay].day,
      date: docSlots[activeDay].date
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBooking = async () => {
    if (!selectedSlot || !userData?.email) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      const bookingData = {
        name: formData.name,
        email: userData.email,
        phone: formData.phone,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
        doctorId: docId,
        doctorName: docInfo.name,
        date: docSlots[activeDay].fullDate,
        slot: selectedSlot.time,
        totalFee: docInfo.fee + 500
      };

      // Validate all required fields
      const requiredFields = ['name', 'email', 'phone', 'address', 'paymentMethod', 'doctorId', 'doctorName', 'date', 'slot', 'totalFee'];
      const missingFields = requiredFields.filter(field => !bookingData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Check if slot is already booked
      if (bookedSlots.includes(selectedSlot.time)) {
        throw new Error('This time slot is already booked. Please select another slot.');
      }

      const response = await fetch(`${backendUrl}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to book appointment');
      }

      setShowConfirmation(true);
      setError(null);
      toast.success('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
      setError(error.message);
      toast.error(error.message || 'Something went wrong. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading doctor details...</p>
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
            onClick={() => navigate('/doctors')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Doctors
          </button>
        </div>
      </div>
    );
  }

  if (!docInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Doctor not found</h2>
          <p className="text-gray-600 mb-4">We couldn't find the doctor you're looking for.</p>
          <button 
            onClick={() => navigate('/doctors')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {docInfo && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Book Appointment with {docInfo.name}</h2>
          <p className="text-gray-600 mb-4">Specialization: {docInfo.specialization}</p>
          <div className="mb-4">
            <p className="text-gray-600">Doctor's Fee: {currencySymbol}{docInfo.fee}</p>
            <p className="text-gray-600">Service Charge: {currencySymbol}500</p>
            <p className="text-gray-800 font-semibold mt-2">Total Amount: {currencySymbol}{docInfo.fee + 500}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Your Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Select Date and Time</h3>
            <div className="flex space-x-4 mb-4">
              {docSlots.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className={`px-4 py-2 rounded-lg ${
                    activeDay === index
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {day.day}, {day.date}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {docSlots[activeDay]?.times.map((slot, index) => {
                const isBooked = bookedSlots.includes(slot.time);
                return (
                  <button
                    key={index}
                    onClick={() => handleSlotSelect(slot.time)}
                    disabled={isBooked}
                    className={`p-2 rounded-lg relative ${
                      selectedSlot?.time === slot.time
                        ? 'bg-blue-500 text-white'
                        : isBooked
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {slot.time}
                    {isBooked && (
                      <span className="absolute top-1 right-1 text-xs text-red-500 font-bold">
                        Booked
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleBooking}
            disabled={!selectedSlot || !formData.name || !formData.phone || !formData.address || bookedSlots.includes(selectedSlot?.time)}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              !selectedSlot || !formData.name || !formData.phone || !formData.address || bookedSlots.includes(selectedSlot?.time)
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {!userData?.email ? 'Please Sign In to Book' : 'Book Appointment'}
          </button>
        </div>
      )}

      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Sign In Required</h3>
            <p className="mb-4">Please sign in to book an appointment.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Appointment Booked!</h3>
            <p className="mb-4">Your appointment has been successfully booked.</p>
            <div className="flex justify-end">
              <button
                onClick={() => navigate('/my-appointments')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                View Appointments
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
        