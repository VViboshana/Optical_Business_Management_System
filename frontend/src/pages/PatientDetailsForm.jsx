//linara
import React, { useState, useEffect } from 'react';

const PatientDetailsForm = ({ doctorId, date, timeSlot }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'Cash', // Default payment method
  });
  const [doctorFee, setDoctorFee] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/${doctorId}`);
        const doctor = await response.json();
        if (response.ok) {
          setDoctorFee(doctor.fee);
          setServiceCharge(doctor.serviceCharge);
        } else {
          setMessage('Error fetching doctor details');
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('Error fetching doctor details');
      }
    };

    if (doctorId) {
      fetchDoctorDetails();
    }
  }, [doctorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.paymentMethod === 'Cash') {
      try {
        const response = await fetch('http://localhost:5000/api/book-appointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            doctorId,
            date,
            timeSlot,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setMessage('Appointment booked successfully!');
        } else {
          setMessage(result.message || 'Error booking appointment');
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('Error booking appointment');
      }
    } else {
      setMessage('Redirecting to payment...');
      // Handle card payment logic here
    }
  };

  const totalFee = doctorFee + serviceCharge;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg grid grid-cols-2 gap-6">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Patient Details</h2>
        
        {message && <p className="text-center text-green-500">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="4"
              className="mt-1 block w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md"
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            {formData.paymentMethod === 'Cash' ? 'Book Appointment' : 'Proceed to Payment'}
          </button>
        </form>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Total Fee</h2>
        <div className="flex justify-between text-lg font-medium text-gray-700">
          <span>Doctor Fee:</span>
          <span>${doctorFee}</span>
        </div>
        <div className="flex justify-between text-lg font-medium text-gray-700">
          <span>Service Charge:</span>
          <span>${serviceCharge}</span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-xl font-semibold text-gray-800">
          <span>Total:</span>
          <span>${totalFee}</span>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsForm;