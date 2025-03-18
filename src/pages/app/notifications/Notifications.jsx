import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router";
import FilterModal from "../../../components/global/FilterModal";
import { FaSearch } from "react-icons/fa";

const notifications = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    description:
      "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit. Cras sem egestas praesent enim elementum dolor arcu.",
    status: "Delivered",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor",
    description:
      "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit. Cras sem egestas praesent enim elementum dolor arcu.",
    status: "Delivered",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    description:
      "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit. Cras sem egestas praesent enim elementum dolor arcu.",
    status: "Delivered",
  },
  {
    id: 4,
    title: "Lorem ipsum dolor",
    description:
      "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit. Cras sem egestas praesent enim elementum dolor arcu.",
    status: "Delivered",
  },
];

const Notifications = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const filteredNotifications = notifications.filter((notification) =>
    notification.title.toLowerCase().includes(searchInput.toLowerCase())
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="w-full p-6 ml-1 bg-white mt-8 rounded-xl shadow">
      {/* Header Section */}
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Push Notifications</h2>
        <div className="flex items-center gap-3">
          <button
            className="bg-[#5BAFEB] text-white px-4 py-2 rounded-md text-sm hover:opacity-90"
            onClick={() => navigate("/app/create-notification")}
          >
            + Create Notification
          </button>
          <FaFilter
            size={32}
            className="text-white bg-[#5BAFEB] p-2 rounded-lg cursor-pointer hover:opacity-80"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            id="filter-button"
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full flex justify-start items-center gap-0 mb-4">
        <div className="relative w-full">
          <input
            type="text"
            id="name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name or city"
            className="block w-full bg-[#F5F7F7] rounded-md px-3 py-2 pr-12 pl-10 shadow-sm outline-none focus:border-[#5BAFEB] focus:ring focus:ring-red-200 focus:ring-opacity-50"
          />
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 active:scale-95 rounded-md bg-[#5BAFEB] px-6 py-2 font-medium text-white outline-none focus:ring focus:ring-red-200 hover:opacity-90">
            Search
          </button>
          <FaSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>
      </div>

      {/* Grid Layout Section */}

      {/* Table headers with gray background */}
      <div className="grid grid-cols-1 rounded-lg bg-[#F3F5F7]  items-start sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 gap-4 mb-4">
        <div className=" font-semibold text-[12px] text-[#787F8C] p-2">
          S.NO
        </div>
        <div className=" font-semibold  text-[12px] text-[#787F8C] p-2">
          TITLE
        </div>
        <div className=" font-semibold text-[12px] text-[#787F8C] p-2 col-span-3">
          DESCRIPTION
        </div>
        <div className=" font-semibold text-[12px] text-[#787F8C] p-2">
          STATUS
        </div>
      </div>
      <div className="grid grid-cols-1 items-start sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 gap-4 mb-4">
        {/* Table data */}
        {filteredNotifications.length === 0 ? (
          <div className="col-span-full text-center py-4 text-gray-500">
            No notifications found
          </div>
        ) : (
          filteredNotifications.map((notification, index) => (
            <>
              <div className="p-2 col-span-1">{index + 1}</div>
              <div className="p-2 font-medium">{notification.title}</div>
              <div className="p-2 text-[#18181880] col-span-3">
                {notification.description}
              </div>
              <div className="p-2">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    notification.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {notification.status}
                </span>
              </div>
            </>
          ))
        )}
      </div>
      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
};

export default Notifications;
