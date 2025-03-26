import React, { useState, useEffect } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { FaFilter, FaSearch } from "react-icons/fa";
import FilterModal from "../../../components/global/FilterModal";
import { FaHeart } from "react-icons/fa";
import { useUsers } from "../../../hooks/api/Get"; // Import the custom hook
import SkeletonLoader from "../../../components/global/SkeletonLoader";
import CalendarField from "../../../components/global/CalendarField";

const Users = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const [ageRange, setAgeRange] = useState("");
  const [gender, setGender] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, data, pagination } = useUsers("/admin/user", currentPage);

  const users = data?.data || [];

  const filteredData = users.filter(
    (user) =>
      user?.fullName?.toLowerCase().includes(searchInput.toLowerCase()) ||
      "" ||
      user?.city?.toLowerCase().includes(searchInput.toLowerCase()) ||
      ""
  );

  const convertDate = (dateIso) => {
    const date = new Date(dateIso);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}/${year}`;
  };

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

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="w-full p-6 ml-1 flex flex-col justify-start items-start gap-3 bg-white mt-8 rounded-md">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Users</h2>
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
        <div className="rounded-xl bg-white">
          <table className="w-full text-left text-gray-500">
            <thead>
              <tr>
                <th className="px-4 py-4 text-[11px] text-[#0A150F80]">Name</th>
                <th className="px-6 py-4 text-[11px] text-[#0A150F80]">Age</th>
                <th className="px-6 py-4 text-[11px] text-[#0A150F80]">
                  Gender
                </th>
                <th className="px-6 py-4 text-[11px] text-[#0A150F80]">
                  Created At
                </th>
                <th className="px-6 py-4 text-[11px] text-[#0A150F80]">
                  State
                </th>
                <th className="px-6 py-4 text-[11px] text-[#0A150F80]">City</th>
                <th className="px-6 py-6 text-[11px] flex items-center space-x-1">
                  Matches
                </th>
                <th className="px-6 py-4 text-[11px] text-[#0A150F80]">
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
                    <td className="px-2 py-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={user?.profilePicture || "default-image.jpg"}
                          alt={user?.fullName || "No Name"}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex flex-col">
                          <span className="text-md">
                            {user?.name || "No Name"}
                          </span>
                          <span className="text-xs text-[#ADADAD]">
                            {user?.phone || "No Email"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-2">{user?.age || "N/A"}</td>
                    <td className="px-8 py-2">{user?.gender || "N/A"}</td>
                    <td className="px-8 py-2">
                      {" "}
                      {convertDate(user?.createdAt || "N/A")}
                    </td>

                    <td className="px-8 py-2">{user?.state}</td>
                    <td className="px-8 py-2">{user?.city || "N/A"}</td>
                    <td className="px-6 py-6 flex items-center space-x-1">
                      <FaHeart size={18} className="text-red-500" />
                      <span>{user?.matches}</span>
                    </td>
                    <td className="px-8 py-4">{user?.role}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}

        // startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
      />
    </div>
  );
};

export default Users;
