import React, { useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useNotifications } from "../../../hooks/api/Get";
import FilterModal from "../../../components/global/FilterModal";
import SkeletonLoader from "../../../components/global/SkeletonLoader";

const Notifications = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const { loading, data, pagination } = useNotifications("/admin/notification");

  const filteredNotifications = data.filter((notification) =>
    notification.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="w-full p-6 ml-1 bg-white mt-8 rounded-xl shadow  overflow-auto h-full">
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

      <div className="w-full flex justify-start items-center gap-0 mb-4">
        <div className="relative w-full">
          <input
            type="text"
            id="name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by title"
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

      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-[#F3F5F7]">
              <th className="font-semibold text-[12px] text-[#787F8C] p-2 text-left">
                S.NO
              </th>
              <th className="font-semibold text-[12px] text-[#787F8C] p-2 text-left">
                TITLE
              </th>
              <th className="font-semibold text-[12px] text-[#787F8C] p-2 text-left">
                DESCRIPTION
              </th>
              <th className="font-semibold text-[12px] text-[#787F8C] p-2 text-left">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredNotifications?.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No notifications found
                </td>
              </tr>
            ) : (
              filteredNotifications.map((notification, index) => (
                <tr key={notification?._id} className="border-b">
                  <td className="p-8">{index + 1}</td>
                  <td className="p-2 font-medium">{notification?.title}</td>
                  <td className="p-2 text-[#18181880]">
                    {notification?.description}
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        notification?.isSent
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {notification?.isSent ? "Delivered" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
};

export default Notifications;
