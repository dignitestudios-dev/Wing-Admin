import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const BlockModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[525px] h-[393px] shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Block User</h2>
          <IoClose className="text-2xl cursor-pointer" onClick={onClose} />
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <div>
            <label className="text-gray-700 text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title here"
              className="w-full px-3 py-2 border rounded-xl focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm font-medium">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Blocking Reason"
              className="w-full px-3 py-2 border rounded-xl focus:ring focus:ring-blue-300 outline-none h-24"
            />
          </div>

          <button
            onClick={() => onSubmit(title, description)}
            className="w-full bg-[#5BAFEB] text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockModal;
