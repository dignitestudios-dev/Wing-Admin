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
  const [filter, setFilter] = useState("weekly");

  const data = {
    daily: [50, 60, 70, 80, 90, 100, 110],
    weekly: [100, 200, 150, 100, 300, 450, 250, 150, 200, 350, 400, 500],
    monthly: [1200, 1400, 1500, 1600, 1700, 1800, 1900],
    lastMonth: [1000, 1100, 1200, 1300, 1400, 1500, 1600],
    yearly: [4000, 4200, 4300, 4400, 4600, 4800, 5000],
  };

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
        label: "Total Users Matches",
        data: data[filter],
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        ticks: { beginAtZero: true },
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
        {/* Total Users Matches Heading */}
        <div className="flex items-center">
          <span
            className="w-4 h-4 mr-2 rounded-full bg-blue-500"
            aria-label="Blue Circle"
          ></span>
          <h1 className="text-black text-[11px] mr-2">Total Users Matches</h1>
        </div>
      </div>
      <div style={{ height: "300px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TotalMatches;
