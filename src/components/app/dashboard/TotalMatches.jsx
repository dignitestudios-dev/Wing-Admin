import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDashboardData } from "../../../hooks/api/Get"; // Import the custom hook
import SkeletonLoader from "../../global/SkeletonLoader";

// Register required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TotalMatches = () => {
  const [filter, setFilter] = useState("monthly"); // default to 'monthly'

  // Fetch dashboard data using the custom hook
  const { loading, data } = useDashboardData();

  if (loading) {
    return <SkeletonLoader />; // Show skeleton loader when loading
  }

  if (!data) {
    return <div>No data available</div>; // Handle the case where there is no data
  }

  const matchGraphData = data?.matchGraph || [];

  // Get the data for the selected filter
  const filteredData = matchGraphData.map((item) => item.matchCount);
  const labels = matchGraphData.map((item) => item.month);

  // Prepare chart data
  const chartData = {
    labels: labels, // Get months from match graph data
    datasets: [
      {
        label: "Total Matches",
        data: filteredData,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.3,
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: "#3B82F6",
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#2563EB",
        pointBorderColor: "white",
        pointBorderWidth: 2,
      },
    ],
  };

  // Chart options with responsive settings and other configurations
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        min: 0,
        ticks: {
          beginAtZero: true,
          stepSize: 5,
        },
        grid: { color: "#E5E7EB" },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#374151", font: { size: 14 } },
        display: false,
      },
      tooltip: {
        backgroundColor: "#2563EB",
        titleColor: "#FFF",
        bodyColor: "#FFF",
        displayColors: false,
        padding: 10,
        borderRadius: 6,
      },
    },
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl">
      <div className="w-full h-10 flex justify-between items-center mb-4">
        <h1 className="text-black text-xl">Total Matches</h1>
        <div className="flex items-center">
          <span
            className="w-4 h-4 mr-2 rounded-full bg-blue-500"
            aria-label="Blue Circle"
          ></span>
          <h1 className="text-black text-[11px] mr-2">Total Matches</h1>
        </div>
      </div>

      <div style={{ height: "300px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TotalMatches;
