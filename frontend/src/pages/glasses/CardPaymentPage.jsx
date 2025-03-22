import React, { useState } from "react";

const FinalPay = () => {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [cvn, setCvn] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }
    if (!/^\d{2}$/.test(expirationMonth) || expirationMonth < 1 || expirationMonth > 12) {
      newErrors.expirationMonth = "Invalid month. Must be between 01 and 12.";
    }
    if (!/^\d{4}$/.test(expirationYear)) {
      newErrors.expirationYear = "Invalid year. Must be 4 digits.";
    }
    if (!/^\d{3,4}$/.test(cvn)) {
      newErrors.cvn = "CVN must be 3 or 4 digits.";
    }
    if (!cardType) newErrors.cardType = "Please select a card type.";
    if (!cardNumber) newErrors.cardNumber = "Card number is required.";
    if (!expirationMonth || !expirationYear) newErrors.expirationDate = "Expiration date is required.";
    if (!cvn) newErrors.cvn = "CVN is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayClick = () => {
    if (validateForm()) {
      setIsPaymentSuccessful(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Payment Details</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Card Type:</label>
            <select
              className="w-full p-2 border rounded mt-1"
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
            >
              <option value="">Select card type</option>
              <option value="visa">Visa</option>
              <option value="mastercard">MasterCard</option>
            </select>
            {errors.cardType && <p className="text-red-500 text-sm">{errors.cardType}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Card Number:</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your card number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Expiration Date:</label>
            <div className="flex space-x-2">
              <input
                type="text"
                className="w-1/2 p-2 border rounded mt-1"
                placeholder="MM"
                maxLength="2"
                value={expirationMonth}
                onChange={(e) => setExpirationMonth(e.target.value)}
              />
              <input
                type="text"
                className="w-1/2 p-2 border rounded mt-1"
                placeholder="YYYY"
                maxLength="4"
                value={expirationYear}
                onChange={(e) => setExpirationYear(e.target.value)}
              />
            </div>
            {errors.expirationMonth && <p className="text-red-500 text-sm">{errors.expirationMonth}</p>}
            {errors.expirationYear && <p className="text-red-500 text-sm">{errors.expirationYear}</p>}
          </div>

          <div>
            <label className="block text-gray-700">CVN:</label>
            <input
              type="password"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter CVN"
              maxLength="4"
              value={cvn}
              onChange={(e) => setCvn(e.target.value)}
            />
            {errors.cvn && <p className="text-red-500 text-sm">{errors.cvn}</p>}
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handlePayClick}
            >
              Pay
            </button>
          </div>
        </form>

        {isPaymentSuccessful && (
          <p className="text-green-500 text-center mt-4 font-semibold">Payment Successful!</p>
        )}
      </div>
    </div>
  );
};

export default FinalPay;
