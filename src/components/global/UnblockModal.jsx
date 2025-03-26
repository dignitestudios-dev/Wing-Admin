import React from "react";
import { IoClose } from "react-icons/io5";
import { IoWarningOutline } from "react-icons/io5";

const UnblockModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[320px] h-[251px] shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <IoWarningOutline className="text-yellow-500 text-4xl" />
        </div>

        <h2 className="text-xl font-semibold">Unblock User</h2>
        <p className="text-gray-600 mt-2">
          Are you sure you want to unblock this user?
        </p>

        <div className="flex justify-between mt-6 space-x-4">
          <button
            onClick={onClose}
            className="w-1/2 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
          >
            Don’t unblock
          </button>
          <button
            onClick={onSubmit}
            className="w-1/2 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600"
          >
            Unblock Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnblockModal;
