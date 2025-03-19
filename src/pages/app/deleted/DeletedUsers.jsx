import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterModal from "../../../components/global/FilterModal";
import { FaSearch } from "react-icons/fa";

const DeletedUsers = () => {
  // Static data
  const reasons = [
    {
      fullName: "John Doe",
      email: "123456789",
      reason: "Account was inactive for 6 months",
      status: "Deleted", // Add status
      updatedAt: "2025-03-01T12:00:00Z",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      fullName: "Jane Smith",
      email: "123456789",
      reason: "Policy violation",
      status: "Deactivated", // Add status
      updatedAt: "2025-02-28T08:30:00Z",
      profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    // Add more static data as needed
  ];

  const [searchInput, setSearchInput] = useState("");

  const convertDate = (dateIso) => {
    const date = new Date(dateIso);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}/${year}`;
  };

  const filteredData = reasons.filter(
    (reason) =>
      reason.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
      reason.email.toLowerCase().includes(searchInput.toLowerCase())
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

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <div className="w-full p-6 ml-1 flex flex-col justify-start items-start gap-3 bg-white mt-8 rounded-xl">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            Deleted / Deactivated Users
          </h2>
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

        {filteredData.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No users found</p>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-gray-500">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 lg:px-4 xl:px-0 font-medium text-[#0A150F80]"
                  >
                    User
                  </th>

                  <th
                    scope="col"
                    className="px-6 lg:px-4 xl:px-0 font-medium text-[#0A150F80]"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-6 lg:px-4 xl:px-0 font-medium text-[#0A150F80]"
                  >
                    Reason
                  </th>

                  <th
                    scope="col"
                    className="px-6 lg:px-4 xl:px-0 font-medium text-[#0A150F80]"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentData.map((reason, key) => {
                  return (
                    <tr key={key}>
                      <th className="px-6 lg:px-4 xl:px-0 flex gap-3 py-4 font-normal text-black">
                        <div className="relative h-10 w-10">
                          <img
                            className="h-full w-full rounded-full object-cover object-center"
                            src={reason.profilePicture}
                            alt=""
                          />
                          {/* <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
                        </div>
                        <div className="text-sm">
                          <div className="font-medium text-black">
                            {reason.fullName}
                          </div>
                          <div className="text-gray-400">{reason.email}</div>
                        </div>
                      </th>

                      <td className="px-6 lg:px-4 xl:px-0 py-4 text-black capitalize">
                        {reason.status} {/* Display Status */}
                      </td>

                      <td className="px-6 lg:px-4 xl:px-0 py-4  text-black capitalize">
                        {reason.reason}
                      </td>

                      <td className="px-6 lg:px-4 xl:px-0 py-4 text-black font-normal">
                        {convertDate(reason.updatedAt)}
                      </td>
                    </tr>
                  );
                })}
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
                  goToPage(
                    currentPage < totalPages ? currentPage + 1 : currentPage
                  )
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
        )}
      </div>
      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </>
  );
};

export default DeletedUsers;
