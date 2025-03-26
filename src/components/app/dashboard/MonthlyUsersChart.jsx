import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDashboardData } from "../../../hooks/api/Get";
import SkeletonLoader from "../../global/SkeletonLoader";

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyUsersChart = () => {
  const { loading, data } = useDashboardData();

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const monthlyUsersData = data?.userGraph || [];

  // Extract userCount values for chart data
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "New Users",
        data: monthlyUsersData.map((item) => item.userCount),
        backgroundColor: monthlyUsersData.map((value, index) => {
          if (index === 1) return "#D0344F"; // Lowest value (Feb)
          if (index === 8) return "#60A5FA"; // Highest value (Sep)
          return "#2F6E95"; // Default color
        }),
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100,
        },
      },
    },
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Monthly Trends Of New Users</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#60A5FA" }}
            ></span>
            <span>Highest Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#D0344F" }}
            ></span>
            <span>Lowest Users</span>
          </div>
        </div>
      </div>

      <div style={{ height: "300px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default MonthlyUsersChart;
