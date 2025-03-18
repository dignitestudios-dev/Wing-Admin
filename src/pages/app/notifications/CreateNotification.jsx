import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const CreateNotification = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userType, setUserType] = useState("all");
  const navigate = useNavigate();

  return (
    <div className="w-full h-full mx-auto bg-white p-6 ml-1 mt-8 rounded-xl shadow">
      <div className="flex items-center mb-4">
        <button className="flex items-center text-black hover:text-gray-800 mr-2">
          <FaArrowLeft />
        </button>
        <h2 className="text-xl font-semibold">Create Notification</h2>
      </div>
      <div className="p-6">
        <span className="text-gray-700 mb-2">Title of Notification</span>
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title of Notification"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-md p-2 mb-4 outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Description Input */}
        <span className="text-gray-700 mb-2">Description of Notification</span>

        <textarea
          placeholder="Description of Notification"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-md p-2 mb-4 outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>

        {/* Date and Time Inputs */}
        <div className="flex gap-0 mb-4">
          <div className="relative mr-2">
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-[220px] border rounded-xl p-2 pl-10 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="relative">
            <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-[220px] border rounded-xl p-2 pl-10 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* User Type Selection */}
        <div className="mb-4">
          <span className="text-gray-700">User Type-Based</span>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="winging"
                checked={userType === "winging"}
                onChange={() => setUserType("winging")}
                className="form-radio"
              />
              Winging Only Users
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="dating"
                checked={userType === "dating"}
                onChange={() => setUserType("dating")}
                className="form-radio"
              />
              Dating Plus Winging Users
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="all"
                checked={userType === "all"}
                onChange={() => setUserType("all")}
                className="form-radio"
              />
              All Users (Both Categories)
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-2">
          <button className="bg-[#5BAFEB] w-[150px] h-[50px] text-white px-6 py-2 rounded-md hover:bg-[#41a1e6]">
            Save
          </button>
          <button className="bg-gray-300 text-[14px] w-[150px] h-[50px] font-bold text-black px-6 py-2 rounded-md hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNotification;
