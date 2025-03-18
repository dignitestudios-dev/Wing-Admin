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
  // Data for the chart
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
        data: [200, 100, 400, 520, 180, 390, 450, 220, 560, 0, 0, 0],
        backgroundColor: [
          "#2F6E95", // Default bar color
          "#D0344F", // Lowest value (Feb)
          "#2F6E95",
          "#2F6E95",
          "#2F6E95",
          "#2F6E95",
          "#2F6E95",
          "#2F6E95",
          "#60A5FA", // Highest value (Sep)
          "#F3F4F6",
          "#F3F4F6",
          "#F3F4F6", // Future months
        ],
        borderRadius: 4,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the default legend
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
