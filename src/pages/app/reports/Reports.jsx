import React, { useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import FilterModal from "../../../components/global/FilterModal";
import BlockModal from "../../../components/global/BlockModal";
import UnblockModal from "../../../components/global/UnblockModal";
import { useReports } from "../../../hooks/api/Get"; // Import the custom hook
import SkeletonLoader from "../../../components/global/SkeletonLoader";

const Reports = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const {
    loading,
    data: reports,
    pagination,
  } = useReports("/admin/user/reported", currentPage);

  const itemsPerPage = 15;
  const totalPages = Math.ceil(pagination.totalItems / itemsPerPage);

  const filteredReports = reports.filter(
    (item) =>
      item.reportedUser.name
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      item.reportedUser.phone
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      item.user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.user.phone.toLowerCase().includes(searchInput.toLowerCase())
  );

  const currentReports = filteredReports.slice(
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

  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isUnblockModalOpen, setIsUnblockModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  if (loading) {
    return <SkeletonLoader />;
  }
  return (
    <div className="w-full p-6 ml-1 flex flex-col justify-start items-start gap-3 bg-white mt-8 rounded-xl">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Reported Users</h2>
        <FaFilter
          size={32}
          className="text-white bg-[#5BAFEB] p-2 rounded-lg cursor-pointer hover:opacity-80"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        />
      </div>

      <div className="w-full flex justify-start items-center gap-0">
        <div className="relative w-full">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name or phone"
            className="block w-full bg-[#F5F7F7] rounded-md px-3 py-2 pr-12 pl-10 shadow-sm outline-none focus:border-[#5BAFEB] focus:ring"
          />
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 active:scale-95 rounded-md bg-[#5BAFEB] px-6 py-2 font-medium text-white outline-none">
            Search
          </button>
          <FaSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>
      </div>

      {/* Set max-height and enable vertical scroll */}
      <div className="w-full max-h-[500px] overflow-y-auto">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead>
            <tr>
              <th className="px-6 py-4 font-medium text-gray-500">User</th>
              <th className="px-6 py-4 font-medium text-gray-500">
                Reported User
              </th>
              <th className="px-6 py-4 font-medium text-gray-500">Reason</th>
              <th className="px-6 py-4 font-medium text-gray-500">
                Created At
              </th>
              <th className=" py-4 font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentReports.map((item, key) => (
              <tr key={key}>
                <td className="px-6 py-4">
                  <div className="flex gap-3 items-center">
                    <img
                      src={item.user.profilePicture}
                      alt="User Profile"
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-700">
                        {item.user.name}
                      </div>
                      <div className="text-gray-400">{item.user.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3 items-center">
                    <img
                      src={item.reportedUser.profilePicture}
                      alt="Reported User Profile"
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-700">
                        {item.reportedUser.name}
                      </div>
                      <div className="text-gray-400">
                        {item.reportedUser.phone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{item.reason}</td>
                <td className="px-6 py-4">
                  {new Date(item.createdAt).toLocaleDateString("en-US")}
                </td>
                <td>
                  {item.reportedUser.blocked ? (
                    <button
                      className="w-auto px-2 h-6 bg-[#F1F1F1] hover:opacity-80 text-black rounded-full text-xs"
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
          <button
            type="button"
            onClick={() =>
              goToPage(currentPage > 1 ? currentPage - 1 : currentPage)
            }
            className="size-11 flex justify-center items-center bg-[#EDEDED] rounded-full text-gray-800 hover:bg-gray-300"
            aria-label="Previous"
          >
            <svg
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

          <button
            type="button"
            onClick={() =>
              goToPage(currentPage < totalPages ? currentPage + 1 : currentPage)
            }
            className="size-11 flex justify-center items-center bg-[#EDEDED] rounded-full text-gray-800 hover:bg-gray-300"
            aria-label="Next"
          >
            <svg
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

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
      <BlockModal
        isOpen={isBlockModalOpen}
        onClose={() => setIsBlockModalOpen(false)}
      />
      <UnblockModal
        isOpen={isUnblockModalOpen}
        onClose={() => setIsUnblockModalOpen(false)}
      />
    </div>
  );
};

export default Reports;
