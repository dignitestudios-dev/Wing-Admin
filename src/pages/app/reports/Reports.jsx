import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterModal from "../../../components/global/FilterModal";
import BlockModal from "../../../components/global/BlockModal";
import UnblockModal from "../../../components/global/UnblockModal"; // Import UnblockModal
import { FaSearch } from "react-icons/fa";

const Reports = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Static data for users and reports
  const reportedUsers = [
    {
      user: {
        fullName: "John Doe",
        email: "john.doe@example.com",
        profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      reportedUser: {
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
        isBlocked: false,
      },
      reason: "Spam behavior",
      description: "Repeated unsolicited messages.",
      createdAt: "2025-02-12T10:30:00Z",
    },
    {
      user: {
        fullName: "Alice Johnson",
        email: "alice.johnson@example.com",
        profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      reportedUser: {
        fullName: "Mark Lee",
        email: "mark.lee@example.com",
        profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
        isBlocked: true,
      },
      reason: "Harassment",
      description: "Inappropriate messages and threats.",
      createdAt: "2025-03-05T14:20:00Z",
    },
    // Add more static data as needed
  ];

  const filteredData = reportedUsers.filter(
    (item) =>
      item.reportedUser.fullName
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      item.reportedUser.email
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      item.user.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.user.email.toLowerCase().includes(searchInput.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBlockClick = (user) => {
    setSelectedUser(user);
    setIsBlockModalOpen(true);
  };

  const handleUnblockClick = (user) => {
    setSelectedUser(user);
    setIsUnblockModalOpen(true);
  };

  const handleModalSubmit = (title, description) => {
    console.log("User Blocked:", selectedUser, title, description);
    setIsBlockModalOpen(false);
  };

  const handleUnblockSubmit = () => {
    console.log("User Unblocked:", selectedUser);
    setIsUnblockModalOpen(false);
  };

  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isUnblockModalOpen, setIsUnblockModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="w-full p-6 ml-1 flex flex-col justify-start items-start gap-3 bg-white  mt-8 rounded-xl">
      {/* Top Section with Heading and Filter Icon */}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Reported Users</h2>
        <FaFilter
          size={32}
          className="text-white bg-[#5BAFEB] p-2 rounded-lg cursor-pointer hover:opacity-80"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          id="filter-button"
        />
      </div>
      <div className="w-full flex justify-start items-center gap-0">
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

      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead>
            <tr>
              <th className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-gray-500">
                User
              </th>
              <th className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-gray-500">
                Reported User
              </th>
              <th className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-gray-500">
                Reason
              </th>
              <th className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-gray-500">
                Description
              </th>
              <th className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-gray-500">
                Created At
              </th>
              <th className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {currentData.map((item, key) => (
              <tr key={key}>
                <th className="px-6 lg:px-4 xl:px-0 flex gap-3 py-4 font-normal text-gray-900">
                  <div className="relative h-10 w-10">
                    <img
                      className="h-full w-full rounded-full object-cover object-center"
                      src={item.user.profilePicture}
                      alt="User Profile"
                    />
                  </div>
                  <div className="text-sm flex flex-col justify-center">
                    <div className="font-medium text-gray-700">
                      {item.user.fullName}
                    </div>
                    <div className="text-gray-400">{item.user.email}</div>
                  </div>
                </th>
                <td className="px-6 lg:px-4 xl:px-0 py-4">
                  <div className="flex gap-3 items-center">
                    <div className="relative h-10 w-10">
                      <img
                        className="h-full w-full rounded-full object-cover object-center"
                        src={item.reportedUser.profilePicture}
                        alt="Reported User Profile"
                      />
                    </div>
                    <div className="text-sm flex flex-col justify-center">
                      <div className="font-medium text-gray-700">
                        {item.reportedUser.fullName}
                      </div>
                      <div className="text-gray-400">
                        {item.reportedUser.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 lg:px-4 xl:px-0 py-4">{item.reason}</td>
                <td className="px-6 lg:px-4 xl:px-0 py-4">
                  {item.description}
                </td>
                <td className="px-6 lg:px-4 xl:px-0 py-4">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
                <td>
                  {item.reportedUser.isBlocked ? (
                    <button
                      className="w-auto px-2 h-6  bg-[#F1F1F1] hover:opacity-80 text-black rounded-full text-xs"
                      onClick={() => handleUnblockClick(item.reportedUser)}
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      className="w-auto px-2 h-6 bg-[#5BAFEB] hover:opacity-80 text-white rounded-full text-xs"
                      onClick={() => handleBlockClick(item.reportedUser)}
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav
          className="flex items-end justify-end space-x-2 mt-4"
          aria-label="Pagination"
        >
          {/* Previous Button */}
          <button
            type="button"
            onClick={() =>
              goToPage(currentPage > 1 ? currentPage - 1 : currentPage)
            }
            className="size-11 flex justify-center items-center bg-[#EDEDED] rounded-full text-gray-800 hover:bg-gray-300 focus:outline-none"
            aria-label="Previous"
          >
            <svg
              className="size-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-3 bg-[#EDEDED] px-4 py-2 rounded-full">
            {Array.from({ length: totalPages }, (_, i) => (
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

          {/* Next Button */}
          <button
            type="button"
            onClick={() =>
              goToPage(currentPage < totalPages ? currentPage + 1 : currentPage)
            }
            className="size-11 flex justify-center items-center bg-[#EDEDED] rounded-full text-gray-800 hover:bg-gray-300 focus:outline-none"
            aria-label="Next"
          >
            <svg
              className="size-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </nav>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Block Modal */}
      <BlockModal
        isOpen={isBlockModalOpen}
        onClose={() => setIsBlockModalOpen(false)}
        onSubmit={handleModalSubmit}
      />

      {/* Unblock Modal */}
      <UnblockModal
        isOpen={isUnblockModalOpen}
        onClose={() => setIsUnblockModalOpen(false)}
        onSubmit={handleUnblockSubmit}
      />
    </div>
  );
};

export default Reports;
