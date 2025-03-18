import React from "react";

import { PiUsersThreeBold } from "react-icons/pi";
import { IoBoatOutline } from "react-icons/io5";
import { CgFileDocument } from "react-icons/cg";
import { RiUserFollowLine } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";

const DashboardStats = () => {
  const data = {
    manager: 10,
    employees: 120,
    boats: 30,
    task: "Feb",
  };

  return (
    <div className="w-full lg:w-[90%] grid grid-cols-2 lg:grid-cols-5 justify-start items-start gap-4 lg:gap-36">
      <div className="w-full lg:w-[214px] h-[88px] rounded-[24px] bg-white p-[12px] flex gap-2 items-center justify-start">
        <span className="w-[64px] h-[64px] rounded-[18px] bg-[#E9FAFF] text-[#35CFFF] text-2xl flex items-center justify-center">
          <PiUsersThreeBold />
        </span>
        <div className="w-auto flex flex-col justify-start items-start">
          <span className="text-[18px] font-bold text-black">
            {data?.manager}
          </span>
          <span className="text-[#0A150F80] text-[12px] font-normal">
            Total Users
          </span>
        </div>
      </div>
      <div className="w-full lg:w-[214px] h-[88px] rounded-[24px] bg-white p-[12px] flex gap-2 items-center justify-start">
        <span className="w-[64px] h-[64px] rounded-[18px] bg-[#EDFFEE]  text-[#3FB743] text-3xl flex items-center justify-center">
          <PiUsersThreeBold />
        </span>
        <div className="w-auto flex flex-col justify-start items-start">
          <span className="text-[18px] font-bold text-black">
            {data?.employees}
          </span>
          <span className="text-[#0A150F80] text-[12px] font-normal">
            Active Users
          </span>
        </div>
      </div>
      <div className="w-full lg:w-[214px] h-[88px] rounded-[24px] bg-white p-[12px] flex gap-2 items-center justify-start">
        <span className="w-[64px] h-[64px] rounded-[18px] bg-[#FFEDED] text-[#C00000] text-3xl flex items-center justify-center">
          <RiUserFollowLine />
        </span>
        <div className="w-auto flex flex-col justify-start items-start">
          <span className="text-[18px] font-bold text-black">
            {data?.boats}
          </span>
          <span className="text-[#0A150F80] text-[12px] font-normal">
            Deleted Users{" "}
          </span>
        </div>
      </div>
      <div className="w-full lg:w-[214px] h-[88px] rounded-[24px] bg-white p-[12px] flex gap-2 items-center justify-start">
        <span className="w-[64px] h-[64px] rounded-[18px] bg-[#FFF5E1] text-[#FFBB39] text-3xl flex items-center justify-center">
          <IoCalendarOutline />
        </span>
        <div className="w-auto flex flex-col justify-start items-start">
          <span className="text-[18px] font-bold text-black">{data?.task}</span>
          <span className="text-[#0A150F80] text-[12px] font-normal">
            Least Joined Month
          </span>
        </div>
      </div>
      <div className="w-full lg:w-[214px] h-[88px] rounded-[24px] bg-white p-[12px] flex gap-2 items-center justify-start">
        <span className="w-[64px] h-[64px] rounded-[18px] bg-[#F8F0FF] text-[#A339FF] text-3xl flex items-center justify-center">
          <IoCalendarOutline />
        </span>
        <div className="w-auto flex flex-col justify-start items-start">
          <span className="text-[18px] font-bold text-black">{data?.task}</span>
          <span className="text-[#0A150F80] text-[12px] font-normal">
            Most Joined Month
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
