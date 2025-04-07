import React, { useState, useEffect } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { FaFilter, FaSearch } from "react-icons/fa";
import FilterModal from "../../../components/global/FilterModal";
import { FaHeart } from "react-icons/fa";
import { useUsers } from "../../../hooks/api/Get"; // Import the custom hook
import SkeletonLoader from "../../../components/global/SkeletonLoader";
import CalendarField from "../../../components/global/CalendarField";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Users = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const [gender, setGender] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [update, setUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [ageStart, setAgeStart] = useState("");
  const [ageEnd, setAgeEnd] = useState("");

  const { loading, data, pagination } = useUsers(
    "/admin/user",
    { startDate, endDate },
    currentPage,
    update,
    searchInput,
    ageStart,
    ageEnd,
    gender
  );
  console.log(pagination, "pagination");
  const users = data?.data || [];

  const convertDate = (dateIso) => {
    const date = new Date(dateIso);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}/${year}`;
  };

  // const currentData = filteredData.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  const goToPage = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdowngender = () => {
    setGenderDropdownOpen(!genderDropdownOpen);
  };

  const handleSelectAge = (value) => {
    const [start, end] = value.split("-");
    setAgeStart(start);
    setAgeEnd(end);
    setIsDropdownOpen(false);
    setUpdate((prev) => !prev);
  };

  const handleSelectGender = (value) => {
    setGender(value);
    setGenderDropdownOpen(false);
    setUpdate((prev) => !prev);
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  // Callback to update the selected dates
  const handleApplyDates = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setUpdate((prev) => !prev);
  };

  return (
    <div className="w-full p-6 ml-1 h-full flex flex-col justify-start items-start gap-3 bg-white mt-8 rounded-md overflow-auto">
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

      <div className="w-full overflow-y-auto">
        <div className="rounded-xl bg-white">
          <table className="w-full text-left text-gray-500">
            <thead>
              <tr>
                <th className="px-4 py-4 text-[11px] text-[#0A150F80]">Name</th>
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
                          "18-24",
                          "25-34",
                          "35-44",
                          "45-54",
                          "55-64",
                          "65-74",
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
                </th>{" "}
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
                        {["male", "female", "other"].map((gender) => (
                          <li
                            key={gender}
                            className="px-4 py-2 text-[#0A150F80] hover:bg-[#f3f3f3] cursor-pointer"
                            onClick={() => handleSelectGender(gender)}
                          >
                            {gender}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
              {data?.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    No users found
                  </td>
                </tr>
              ) : (
                users?.map((user, key) => (
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
          </nav>
        </div>
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyDates}

        // startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
      />
    </div>
  );
};

export default Users;
