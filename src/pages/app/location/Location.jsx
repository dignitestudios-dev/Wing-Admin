import React, { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import FilterModal from "../../../components/global/FilterModal";
import { useLocationData } from "../../../hooks/api/Get"; // Import the custom hook
import SkeletonLoader from "../../../components/global/SkeletonLoader";

const Location = () => {
  // Fetch location data from the custom hook
  const { loading, topLocations, bottomLocations } = useLocationData();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <>
      <div className="container ml-1 mx-auto px-4 py-6 bg-white mt-8 rounded-xl">
        {/* Top Section with Heading and Filter Icon */}
        <div className="w-full flex justify-between items-center mb-4 p-1">
          <h2 className="text-[32px] font-semibold">Location</h2>
          <FaFilter
            size={32}
            className="text-white bg-[#5BAFEB] p-2 rounded-lg cursor-pointer hover:opacity-80"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            id="filter-button"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Top Locations */}
          <div className="bg-[#FCFCFC] p-6 rounded-xl border border-[#CFCFCF] shadow-sm">
            <h3 className="text-lg text-center text-gray-800 mb-4">
              Top 10 cities/regions with the highest user concentration
            </h3>
            <div className="overflow-x-auto pb-8 pr-8 pl-8">
              <table className="w-full table-auto text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="py-3 px-5 text-left font-medium text-gray-600">
                      Location
                    </th>
                    <th className="py-3 px-5 text-left font-medium text-gray-600">
                      Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topLocations.map((location, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition duration-150"
                    >
                      <td className="py-4 px-5 flex items-center gap-2 text-gray-700">
                        <MdLocationOn size={20} className="text-[#5BAFEB]" />
                        {location._id}
                      </td>
                      <td className="py-4 px-5 text-gray-700">
                        {location.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Least Locations */}
          <div className="bg-[#FCFCFC] p-6 rounded-lg border border-[#CFCFCF] shadow-sm">
            <h3 className="text-lg text-center text-gray-800 mb-4">
              Bottom 10 cities/regions with the lowest user count
            </h3>
            <div className="overflow-x-auto pb-8 pr-8 pl-8">
              <table className="w-full table-auto text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="py-3 px-5 text-left font-medium text-gray-600">
                      Location
                    </th>
                    <th className="py-3 px-5 text-left font-medium text-gray-600">
                      Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bottomLocations.map((location, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition duration-150"
                    >
                      <td className="py-4 px-5 flex items-center gap-2 text-gray-700">
                        <MdLocationOn size={20} className="text-[#5BAFEB]" />
                        {location._id}
                      </td>
                      <td className="py-4 px-5 text-gray-700">
                        {location.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Filter Modal */}
        <FilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      </div>
    </>
  );
};

export default Location;
