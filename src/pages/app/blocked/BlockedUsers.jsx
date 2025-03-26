import React, { useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import BlockModal from "../../../components/global/BlockModal";
import UnblockModal from "../../../components/global/UnblockModal";
import FilterModal from "../../../components/global/FilterModal";
import { useBlockedUsers } from "../../../hooks/api/Get"; // Import the new hook
import SkeletonLoader from "../../../components/global/SkeletonLoader";

const BlockedUsers = () => {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isUnblockModalOpen, setIsUnblockModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    loading,
    data: blockedUsers,
    pagination,
  } = useBlockedUsers("/admin/user/blocked", currentPage);

  const handleBlockClick = (user) => {
    setSelectedUser(user);
    setIsBlockModalOpen(true);
  };

  const handleUnblockClick = (user) => {
    setSelectedUser(user);
    setIsUnblockModalOpen(true);
  };

  const handleBlockSubmit = () => {
    console.log("User Blocked:", selectedUser);
    setIsBlockModalOpen(false);
  };

  const handleUnblockSubmit = () => {
    console.log("User Unblocked:", selectedUser);
    setIsUnblockModalOpen(false);
  };

  const totalPages = Math.ceil(blockedUsers.length / 15);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="w-full p-6 ml-1 flex flex-col justify-start items-start gap-3 bg-white mt-8 rounded-md">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Blocked Users</h2>
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
                <th className="lg:px-4 xl:px-0 py-4 text-[11px] text-[#0A150F80] min-w-[110px]">
                  Name
                </th>
                <th className="px-6 lg:px-4 xl:px-0 py-4 text-[11px] text-[#0A150F80]">
                  Age
                </th>
                <th className="px-6 lg:px-4 xl:px-0 py-4 text-[11px] text-[#0A150F80]">
                  Gender
                </th>
                <th className="px-6 lg:px-4 xl:px-0 py-4 text-[11px] text-[#0A150F80]">
                  Created At
                </th>
                <th className="px-6 lg:px-4 xl:px-0 py-4 text-[11px] text-[#0A150F80]">
                  State
                </th>
                <th className="px-6 lg:px-4 xl:px-0 py-4 text-[11px] text-[#0A150F80]">
                  City
                </th>
                <th className="px-6 lg:px-4 xl:px-0 py-4 text-[11px] text-[#0A150F80]">
                  Matches
                </th>
                <th className="px-6 lg:px-4 xl:px-0 py-4 text-[11px] text-[#0A150F80]">
                  Account Type
                </th>
                <th className="px-6 lg:px-4 xl:px-0 py-4 text-[11px] text-[#0A150F80]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-[13px] font-medium text-black">
              {blockedUsers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-4">
                    No blocked users found
                  </td>
                </tr>
              ) : (
                blockedUsers.map((user, key) => (
                  <tr key={key} className="hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={user?.profilePicture || "user-avatar"}
                          alt={user?.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div>{user?.name}</div>
                          <div className="text-sm text-gray-500">
                            {user?.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-1 py-2">{user?.age || "N/A"}</td>
                    <td className="px-1 py-2">{user?.gender}</td>
                    <td className="px-1 py-2">
                      {" "}
                      {new Date(user.createdAt).toLocaleDateString("en-US")}
                    </td>
                    <td className="px-1 py-2">{user?.state}</td>
                    <td className="px-1 py-2">{user?.city}</td>
                    <td className="px-6 py-6">{user?.matches}</td>
                    <td className="py-4">{user?.role}</td>
                    <td>
                      <button
                        onClick={() =>
                          user?.isBlocked
                            ? handleUnblockClick(user)
                            : handleBlockClick(user)
                        }
                        className={`w-auto px-2 h-6 ${
                          user?.isBlocked
                            ? "bg-gray-300 text-black"
                            : "bg-[#5BAFEB] text-white"
                        } hover:opacity-80  rounded-full text-xs`}
                      >
                        {user?.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <BlockModal
          isOpen={isBlockModalOpen}
          onClose={() => setIsBlockModalOpen(false)}
          onSubmit={handleBlockSubmit}
        />
        <UnblockModal
          isOpen={isUnblockModalOpen}
          onClose={() => setIsUnblockModalOpen(false)}
          onSubmit={handleUnblockSubmit}
        />
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
};

export default BlockedUsers;
