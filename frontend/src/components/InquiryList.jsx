import React, { useState, useEffect, useContext } from 'react';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const InquiryList = () => {
  const { userData, backendUrl } = useContext(AppContent);
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/inquiry/user-inquiries', {
        params: { userId: userData._id }
      });

      if (response.data.success) {
        setInquiries(response.data.inquiries);
      } else {
        toast.error(response.data.message || 'Failed to fetch inquiries');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred while fetching inquiries');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">My Inquiries</h2>
      
      {inquiries.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No inquiries found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{inquiry.subject}</h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(inquiry.createdAt)}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    inquiry.status
                  )}`}
                >
                  {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                </span>
              </div>
              
              <p className="text-gray-700 mb-4">{inquiry.message}</p>
              
              <div className="flex items-center text-sm text-gray-500">
                <span>Status: </span>
                <span className={`ml-2 ${getStatusColor(inquiry.status)} px-2 py-1 rounded-full`}>
                  {inquiry.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InquiryList; 