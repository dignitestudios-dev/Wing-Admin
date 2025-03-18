import React from "react";
import MonthlyUsersChat from "../../components/app/dashboard/MonthlyUsersChart";
import TotalMatches from "../../components/app/dashboard/TotalMatches";
import DashboardStats from "../../components/app/dashboard/DashboardStats";

const Home = () => {
  return (
    <>
      <div className="h-screen overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
        <h1 className="text-black text-3xl font-bold">Dashboard</h1>

        <div className="w-full flex flex-col gap-6">
          <DashboardStats />
        </div>

        <div className="w-full flex flex-col gap-6">
          <TotalMatches />
        </div>
        <div className="w-full flex flex-col gap-6">
          <MonthlyUsersChat />
        </div>
      </div>
    </>
  );
};

export default Home;
