import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";

import { Logo } from "../../assets/export";

const Navbar = () => {
  return (
    <div className="w-full h-[60px] bg-white flex justify-end items-center px-4 relative z-10">
      <div className="flex justify-left items-left pl-2 w-full mt-6 ">
        <img src={Logo} alt="logo" className="h-[80px] hidden lg:block" />
      </div>
      <div className="flex items-center gap-6 py-4 font-normal text-gray-900">
        <div className="relative"></div>

        {/* <button className="flex items-center gap-2 relative">
          <img
            src={"https://i.pravatar.cc/?img=12"}
            alt="Profile"
            className="w-[35px] h-[35px] rounded-full cursor-pointer"
          />
          <div className="w-[80px] flex flex-col justify-start items-start">
            <p className="text-[11px] font-normal text-left text-black">
              <p className="font-bold">Chris Tom </p>Admin
            </p>
            <p className="text-[11px] font-medium text-[#074F57]"></p>
          </div>
        </button> */}
      </div>
    </div>
  );
};

export default Navbar;
