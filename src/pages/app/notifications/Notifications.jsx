import React, { useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useNotifications } from "../../../hooks/api/Get";
import FilterModal from "../../../components/global/FilterModal";
import SkeletonLoader from "../../../components/global/SkeletonLoader";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Notifications = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const { loading, data, pagination } = useNotifications(
    "/admin/notification",
    { startDate, endDate },
    searchInput,
    currentPage,
    update
  );

  const goToPage = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  const handleApplyDates = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setUpdate((prev) => !prev);
  };

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
            placeholder="Search by name or city"
            className="block w-full bg-[#F5F7F7] rounded-md px-3 py-2 pr-12 pl-10 shadow-sm outline-none focus:border-[#5BAFEB] focus:ring focus:ring-red-200 focus:ring-opacity-50"
          />
          <FaSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 active:scale-95 rounded-md bg-[#5BAFEB] px-6 py-2 font-medium text-white outline-none focus:ring focus:ring-red-200 hover:opacity-90"
            onClick={() => setUpdate((prev) => !prev)}
          >
            Search
          </button>
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
            {data?.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No notifications found
                </td>
              </tr>
            ) : (
              data?.map((notification, index) => (
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
        {/* <nav
          className="flex items-end justify-end space-x-2 mt-4"
          aria-label="Pagination"
        >
          <button
            type="button"
            onClick={() =>
              goToPage(currentPage > 1 ? currentPage - 1 : currentPage)
            }
            className="size-11 flex justify-center items-center bg-[#EDEDED] rounded-full text-gray-800 hover:bg-gray-300"
            aria-label="Previous"
          >
            <AiOutlineLeft className="text-lg" />
          </button>

          <div className="flex items-center space-x-3 bg-[#EDEDED] px-4 py-2 rounded-full">
            {Array.from({ length: pagination?.totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToPage(i + 1)}
                className={`size-8 flex justify-center items-center rounded-full text-gray-800 transition ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white shadow-md"
                    : "hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              goToPage(
                currentPage < pagination?.totalPages
                  ? currentPage + 1
                  : currentPage
              )
            }
            className="size-11 flex justify-center items-center bg-[#EDEDED] rounded-full text-gray-800 hover:bg-gray-300"
            aria-label="Next"
          >
            <AiOutlineRight className="text-lg" />
          </button>
        </nav> */}
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyDates}
      />
    </div>
  );
};

export default Notifications;
