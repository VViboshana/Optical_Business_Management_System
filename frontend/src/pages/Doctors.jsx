//linara
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Doctors = () => {
  const { specialization } = useParams(); //get current spec

  const [filterDoc, setFilterDoc] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/");
        const data = await response.json();
        setFilterDoc(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = specialization ? filterDoc.filter((doc) => doc.specialization === specialization): filterDoc;

  return (
    <div>
      <p className="text-black font-semibold">Browse through the doctors by specialization.</p>
      <div className="flex gap-4 mt-4">

        <button onClick={() => navigate("/doctors/General Doctor")}className={`py-2 px-4 border rounded-xl transition-all duration-300 ${
        specialization === "General Doctor" ? "bg-primary text-white" : "bg-gray-100 hover:bg-primary-100"}`}> General Doctor</button>

        <button onClick={() => navigate("/doctors/Optician")}className={`py-2 px-4 border rounded-xl transition-all duration-300 ${
        specialization === "Optician" ? "bg-primary text-white" : "bg-gray-100 hover:bg-primary-100" }`}> Optician </button> </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {filteredDoctors.map((doc) => (
          <div onClick={() => navigate(`/appointment/${doc._id}`)}
          className="border border-matte-orange-border rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          key={doc._id}>

            <div className="p-4">
              <p className="text-gray-900 text-lg font-medium">{doc.name}</p>
              <p className="text-gray-600 text-sm">{doc.specialization}</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
