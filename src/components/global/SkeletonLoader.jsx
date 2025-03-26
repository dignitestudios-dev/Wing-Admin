import React from "react";

// Custom Skeleton Loader for charts and text
const SkeletonLoader = () => (
  <div className="skeleton-container w-full p-6 bg-white rounded-xl mt-8">
    <div className="w-full h-10 flex justify-between items-center mb-4 animate-pulse">
      <div className="skeleton-box h-6 bg-gray-300 rounded w-2/4"></div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
        <div className="skeleton-box h-4 bg-gray-300 rounded w-16"></div>
      </div>
    </div>

    {/* Skeleton for chart */}
    <div className="skeleton-box w-full h-64 bg-gray-300 rounded animate-pulse"></div>
  </div>
);

export default SkeletonLoader;
