import React, { useState } from "react";
import { FaHeart, FaFilter, FaSearch } from "react-icons/fa";
import FilterModal from "../../../components/global/FilterModal";
import { useMatches } from "../../../hooks/api/Get"; // Import the useMatches hook
import SkeletonLoader from "../../../components/global/SkeletonLoader";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Matches = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const {
    loading,
    data: matches,
    pagination,
  } = useMatches(
    "/admin/match",
    { startDate, endDate },
    searchInput,
    currentPage,
    update
  );

  // Callback to update the selected dates
  const handleApplyDates = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setUpdate((prev) => !prev);
  };

  const goToPage = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="w-full p-6 ml-1 flex flex-col justify-start items-start gap-3 bg-white mt-8 rounded-xl">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-[32px] font-semibold">Matches</h2>
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

      <div className="w-full h-auto grid grid-cols-1 gap-4 lg:grid-cols-2">
        {matches?.data?.length > 0 &&
          matches?.data?.map((match, key) => (
            <div
              key={key}
              className="w-full h-40 flex justify-start items-start p-6 md:p-2 lg:p-6 gap-4 bg-[#F5F5F5] rounded-2xl border border-[#CFCFCF]"
            >
              {/* User 1 */}
              <div className="w-[49%] flex flex-col items-center gap-y-2 rounded-xl">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <img
                    src={match?.user1?.profilePicture}
                    alt={match?.user1?.name}
                    className="w-16 h-16 rounded-full"
                    style={{
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                  <h2 className="leading-tight text-sm font-medium">
                    {match?.user1?.name}
                  </h2>
                  <div className="text-gray-400 text-xs">
                    {match?.user1?.phone}
                  </div>
                </div>
              </div>

              <div className="relative w-[1px] flex items-center justify-center h-full rounded-full">
                <span className="absolute top-4 -left-4 w-12 h-12 flex items-center justify-center rounded-full bg-[#c00000]/[0.05]">
                  <FaHeart className="text-2xl text-red-500" />
                </span>
              </div>

              {/* User 2 */}
              <div className="w-[49%] flex flex-col items-center gap-y-2 rounded-xl">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <img
                    src={match?.user2?.profilePicture}
                    alt={match?.user2?.name}
                    className="w-16 h-16 rounded-full"
                    style={{
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                  <h2 className="leading-tight text-sm font-medium">
                    {match?.user2?.name}
                  </h2>
                  <div className="text-gray-400 text-xs">
                    {match?.user2?.phone}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

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

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyDates}
      />
    </div>
  );
};

export default Matches;
