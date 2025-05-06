import React, { useState } from 'react';
import Banner from "../components/Banner";
import News from "../components/News";
import Footer from "../components/Footer";
import NavBar2 from '../components/NavBar2'
import InquiryOverlay from '../components/InquiryOverlay';

const Home = () => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar2/>
      <Banner />
      <News />
      <Footer/>

      {/* Add Inquiry Button */}
      <button
        onClick={() => setIsInquiryOpen(true)}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Inquiry Overlay */}
      <InquiryOverlay
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
};

export default Home;