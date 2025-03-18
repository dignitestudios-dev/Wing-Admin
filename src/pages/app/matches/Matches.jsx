import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import FilterModal from "../../../components/global/FilterModal";
import { FaSearch } from "react-icons/fa";

const Matches = () => {
  const [searchInput, setSearchInput] = useState("");

  // Static data for matches
  const staticMatches = [
    {
      user: {
        profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
        fullName: "John Doe",
        email: "john.doe@example.com",
      },
      otherUser: {
        profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
      },
    },
    {
      user: {
        profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
        fullName: "Mike Johnson",
        email: "mike.johnson@example.com",
      },
      otherUser: {
        profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
        fullName: "Alice Brown",
        email: "alice.brown@example.com",
      },
    },
    // Add more static data as needed
  ];

  // Filtering the matches based on search input
  const filteredData = staticMatches.filter(
    (match) =>
      match?.user?.fullName
        ?.toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      match?.otherUser?.fullName
        ?.toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      match?.user?.email?.toLowerCase().includes(searchInput.toLowerCase()) ||
      match?.otherUser?.email?.toLowerCase().includes(searchInput.toLowerCase())
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="w-full p-6 ml-1 flex flex-col justify-start items-start gap-3 bg-white mt-8 rounded-xl">
      {/* Top Section with Heading and Filter Icon */}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-[32px] font-semibold">Matches</h2>
        <FaFilter
          size={32}
          className="text-white bg-[#5BAFEB] p-2 rounded-lg cursor-pointer hover:opacity-80"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          id="filter-button"
        />
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-3">
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

        <div className="w-full h-auto grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredData.length > 0 &&
            filteredData.map((match, key) => (
              <div
                key={key}
                className="w-full h-40 flex justify-start items-start p-6 md:p-2 lg:p-6 gap-4 bg-[#F5F5F5] rounded-2xl border border-[#CFCFCF]"
              >
                {/* User 1 */}
                <div className="w-[49%] flex flex-col items-center gap-y-2 rounded-xl">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <img
                      src={match?.user?.profilePicture}
                      alt=""
                      className="w-16 h-16 rounded-full"
                      style={{
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    />
                  </div>
                  <div className="w-full flex flex-col justify-center items-center">
                    <h2 className="leading-tight text-sm font-medium">
                      {match?.user?.fullName}
                    </h2>
                    <div className="text-gray-400 text-xs">
                      {match?.user?.email}
                    </div>
                  </div>
                </div>

                {/* Heart Icon */}
                <div className="relative w-[1px] flex items-center justify-center h-full rounded-full">
                  <span className="absolute top-4 -left-4 w-12 h-12 flex items-center justify-center rounded-full bg-[#c00000]/[0.05]">
                    <FaHeart className="text-2xl text-red-500" />
                  </span>
                </div>

                {/* User 2 */}
                <div className="w-[49%] flex flex-col items-center gap-y-2 rounded-xl">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <img
                      src={match?.otherUser?.profilePicture}
                      alt=""
                      className="w-16 h-16 rounded-full"
                      style={{
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    />
                  </div>
                  <div className="w-full flex flex-col justify-center items-center">
                    <h2 className="leading-tight text-sm font-medium">
                      {match?.otherUser?.fullName}
                    </h2>
                    <div className="text-gray-400 text-xs">
                      {match?.otherUser?.email}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
};

export default Matches;
