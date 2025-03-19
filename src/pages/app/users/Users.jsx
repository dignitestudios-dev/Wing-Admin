import React, { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import FilterModal from "../../../components/global/FilterModal";
import { FaSearch } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Users = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const [ageRange, setAgeRange] = useState("");
  const [gender, setGender] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Dummy data
  const dummyUsers = [
    {
      id: 1,
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
      fullName: "John Doe",
      age: 30,
      gender: "Male",
      email: "123456789",

      createdAt: "2025-01-10",
      state: "California",
      city: "Los Angeles",
      accountType: "Winging Only",

      matches: 5,
    },
    {
      id: 2,
      profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
      fullName: "Jane Smith",
      age: 28,
      gender: "Female",
      email: "123456789",

      createdAt: "2024-11-20",
      state: "Texas",
      city: "Houston",
      accountType: "Winging Only",

      matches: 12,
    },
    // Add more dummy data as needed
  ];

  const filteredData = dummyUsers.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.city.toLowerCase().includes(searchInput.toLowerCase())
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

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdowngender = () => {
    setGenderDropdownOpen(!genderDropdownOpen);
  };

  const handleSelectAge = (value) => {
    setAgeRange(value);
    setIsDropdownOpen(false);
  };

  const handleSelectGender = (value) => {
    setGender(value);
    setGenderDropdownOpen(false);
  };

  return (
    <div className="w-full p-6 ml-1 flex flex-col justify-start items-start gap-3 bg-white mt-8 rounded-md ">
      {/* Top Section with Heading and Filter Icon */}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Users</h2>
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
        <div className="rounded-xl  bg-white ">
          <table className="w-full text-left  text-gray-500">
            <thead>
              <tr>
                <th
                  scope="col"
                  className=" lg:px-4 xl:px-0 py-4 text-[11px] text-[#0A150F80] min-w-[250px]"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 lg:px-4 xl:px-0 py-4 text-[11px] text-[#0A150F80] cursor-pointer relative"
                  onClick={handleDropdownToggle}
                >
                  <span className="ml-1 flex">
                    Age
                    {isDropdownOpen ? (
                      <MdArrowDropUp size={18} />
                    ) : (
                      <MdArrowDropDown size={18} />
                    )}
                  </span>
                  {isDropdownOpen && (
                    <div className="absolute bg-white border border-[#0A150F80] rounded-lg mt-2 w-40 shadow-lg z-10">
                      <ul className="py-2">
                        {[
                          "All",
                          "18-24",
                          "25-34",
                          "35-44",
                          "45-54",
                          "55-64",
                          "65-74",
                          "75+",
                        ].map((range) => (
                          <li
                            key={range}
                            className="px-4 py-2 text-[#0A150F80] hover:bg-[#f3f3f3] cursor-pointer"
                            onClick={() => handleSelectAge(range)}
                          >
                            {range}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </th>

                <th
                  scope="col"
                  className="px-6 lg:px-4 xl:px-0 py-4 text-[11px] text-[#0A150F80] cursor-pointer relative"
                  onClick={handleDropdowngender}
                >
                  <span className="ml-1 flex">
                    Gender
                    {genderDropdownOpen ? (
                      <MdArrowDropUp size={18} />
                    ) : (
                      <MdArrowDropDown size={18} />
                    )}
                  </span>
                  {genderDropdownOpen && (
                    <div className="absolute bg-white border border-[#0A150F80] rounded-lg mt-2 w-40 shadow-lg z-10">
                      <ul className="py-2">
                        {[
                          "All",
                          "Male",
                          "Female",
                          "Non-binary",
                          "Genderqueer",
                          "Other",
                        ].map((genderOption) => (
                          <li
                            key={genderOption}
                            className="px-4 py-2 text-[#0A150F80] hover:bg-[#f3f3f3] cursor-pointer"
                            onClick={() => handleSelectGender(genderOption)}
                          >
                            {genderOption}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </th>

                <th
                  scope="col"
                  className="px-6 lg:px-4 xl:px-0 py-4 text-[11px]  text-[#0A150F80]"
                >
                  Created At
                </th>
                <th
                  scope="col"
                  className="px-6 lg:px-4 xl:px-0 py-4 text-[11px] text-[#0A150F80]"
                >
                  State
                </th>
                <th
                  scope="col"
                  className="px-6 lg:px-4 xl:px-0 py-4 text-[11px] text-[#0A150F80]"
                >
                  City
                </th>
                <th
                  scope="col"
                  className="px-6 lg:px-4 xl:px-0 py-4 text-[11px] text-[#0A150F80]"
                >
                  Matches
                </th>
                <th
                  scope="col"
                  className="px-6 lg:px-4 xl:px-0 py-4 text-[11px] text-[#0A150F80]"
                >
                  Account Type
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-[13px] font-medium text-black">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    No users found
                  </td>
                </tr>
              ) : (
                currentData.map((user, key) => (
                  <tr key={key} className="hover:bg-gray-50">
                    <td className=" py-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={user.profilePicture}
                          alt={user.fullName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex flex-col">
                          <span className="text-md">{user.fullName}</span>
                          <span className="text-xs text-[#ADADAD]">
                            {user.email}
                          </span>{" "}
                          {/* Email underneath */}
                        </div>
                      </div>
                    </td>
                    <td className="px-1 py-2">{user.age}</td>
                    <td className="px-1 py-2">{user.gender}</td>
                    <td className="px-1 py-2">{user.createdAt}</td>
                    <td className="px-1 py-2">{user.state}</td>
                    <td className="px-1 py-2">{user.city}</td>
                    <td className="px-6 py-6 flex items-center space-x-1">
                      <FaHeart size={18} className="text-red-500" />
                      <span>{user.matches}</span>
                    </td>
                    <td className="py-4">{user.accountType}</td>

                    {/* <td className="px-6 py-4">
                      <button className="text-blue-600 hover:underline">
                        Edit
                      </button>
                    </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

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
    </div>
  );
};

export default Users;
