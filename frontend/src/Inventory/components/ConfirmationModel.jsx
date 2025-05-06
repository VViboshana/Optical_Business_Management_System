// ConfirmationModal.jsx
import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background Overlay */}
            <div className="fixed inset-0 bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-[90%] max-w-md">
                {/* Modal Title */}
                <h2 className="text-lg font-bold text-gray-800">{title}</h2>

                {/* Modal Message */}
                <p className="mt-2 text-gray-600">{message}</p>

                {/* Buttons */}
                <div className="mt-4 flex justify-end space-x-3">
                    <button
                        className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
