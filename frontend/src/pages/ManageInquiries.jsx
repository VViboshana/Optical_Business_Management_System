import React, { useState, useEffect, useContext } from 'react';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';

const ManageInquiries = () => {
  const { backendUrl } = useContext(AppContent);
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/inquiries`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch inquiries');
      }

      setInquiries(data.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async (inquiryId) => {
    if (!replyMessage.trim()) {
      toast.error('Please enter a reply message');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/inquiries/${inquiryId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reply: replyMessage })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reply');
      }

      toast.success('Reply sent successfully!');
      setReplyMessage('');
      setSelectedInquiry(null);
      fetchInquiries();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-400 flex items-center justify-center">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-400 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Manage Inquiries</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inquiries List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Inquiries</h3>
            {inquiries.length === 0 ? (
              <p className="text-gray-500">No inquiries found</p>
            ) : (
              <div className="space-y-4">
                {inquiries.map(inquiry => (
                  <div
                    key={inquiry._id}
                    className={`p-4 rounded-lg border ${
                      inquiry.status === 'replied' ? 'bg-green-50' : 'bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{inquiry.name}</h4>
                        <p className="text-gray-600">{inquiry.email}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-sm ${
                        inquiry.status === 'replied' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-700">{inquiry.message}</p>
                    {inquiry.reply && (
                      <div className="mt-2 p-2 bg-gray-50 rounded">
                        <p className="text-sm text-gray-600">Reply: {inquiry.reply}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Replied on: {new Date(inquiry.repliedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                    {inquiry.status !== 'replied' && (
                      <button
                        onClick={() => setSelectedInquiry(inquiry)}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Reply
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reply Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Reply to Inquiry</h3>
            {selectedInquiry ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">{selectedInquiry.name}</h4>
                  <p className="text-gray-600">{selectedInquiry.email}</p>
                  <p className="mt-2 text-gray-700">{selectedInquiry.message}</p>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Your Reply</label>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Type your reply here..."
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      setSelectedInquiry(null);
                      setReplyMessage('');
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReply(selectedInquiry._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Select an inquiry to reply</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageInquiries; 