import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUser(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${userId}`, formData);
      setUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col items-center">
        <img src={user.avatar || "https://via.placeholder.com/150"} alt={user.name} className="w-24 h-24 rounded-full mb-4" />
        <h2 className="text-xl font-bold text-gray-800">{isEditing ? <input type="text" name="name" value={formData.name} onChange={handleChange} /> : user.name}</h2>
        <p className="text-gray-600">{isEditing ? <textarea name="bio" value={formData.bio} onChange={handleChange} /> : user.bio}</p>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700">Contact Information</h3>
        <p className="text-gray-600">Email: {isEditing ? <input type="email" name="email" value={formData.email} onChange={handleChange} /> : user.email}</p>
        <p className="text-gray-600">Phone: {isEditing ? <input type="tel" name="phone" value={formData.phone} onChange={handleChange} /> : user.phone}</p>
      </div>
      <div className="mt-4">
        {isEditing ? (
          <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white py-2 px-4 rounded">Edit</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;