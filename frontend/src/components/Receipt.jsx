//linara
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Receipt = () => {
  const { state } = useLocation(); 
  const [appointment, setAppointment] = useState(state?.appointment || null);
  const printRef = useRef(null);

  const handleDownloadPdf = async () => {
    if (!appointment || !printRef.current) return;

    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("appointment_receipt.pdf");
  };

  useEffect(() => {
    if (!appointment) {
      const fetchAppointment = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/appointments/${state?.appointmentId}`);
          const data = await response.json();
          setAppointment(data);
        } catch (error) {
          console.error("Error fetching appointment details:", error);
        }
      };

      fetchAppointment();
    }
  }, [appointment, state?.appointmentId]);
  if (!appointment) return <div>Loading...</div>; 

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
          <div ref={printRef} className="p-8 bg-white border border-gray-200">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Appointment Receipt</h1>
                <p className="text-sm text-gray-600">#{appointment._id}</p>
              </div>
              <div className="text-right">
              <h2 className="font-semibold">Clear Vision</h2>
              <p className="text-sm text-gray-600">Avissawella</p>
            </div>
            
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Receipt To:</h3>
              <p className="text-gray-700">
                {appointment.name}<br />
                {appointment.address}
              </p>
            </div>

            <table className="w-full mb-8 border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Doctor Name</th>
                  <th className="border p-2 text-right">Date</th>
                  <th className="border p-2 text-right">Time Slot</th>
                  <th className="border p-2 text-right">Total Fee</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border p-2">{appointment.doctorName}</td>
                  <td className="border p-2 text-right">{new Date(appointment.date).toLocaleDateString()}</td>
                  <td className="border p-2 text-right">{appointment.slot}</td>
                  <td className="border p-2 text-right">{appointment.totalFee}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center">
            <button onClick={handleDownloadPdf} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
