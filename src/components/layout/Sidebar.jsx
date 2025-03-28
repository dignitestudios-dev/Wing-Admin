import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiLogoutCircleLine, RiMenuLine, RiCloseLine } from "react-icons/ri";
import { sidebarData } from "../../static/Sidebar";
import { IoLogOutOutline } from "react-icons/io5";
import Cookies from "js-cookie";

import { Logo } from "../../assets/export";

const Sidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLinkClick = (url) => {
    setActiveLink(url);
  };

  const handleLogout = () => {
    Cookies.remove("authToken"); // Remove authToken from cookies
    navigate("/auth/login"); // Redirect to login page
  };

  return (
    <div>
      <button
        onClick={toggleDrawer}
        className="lg:hidden fixed top-4 left-4 z-50 text-black"
      >
        {isDrawerOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
      </button>

      <div
        className={`fixed lg:static top-0 left-0 w-[250px] bg-white py-4 flex flex-col justify-start items-start transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-40 min-h-screen h-full overflow-y-auto`}
      >
        {/* Uncomment if logo is needed */}
        {/* <div className="flex justify-left items-left pl-2 w-full">
          <NavLink to="/">
            <img src={Logo} alt="logo" className="h-[100px]" />
          </NavLink>
        </div> */}

        <div className="w-full flex-grow mt-16 scrollbar-hide">
          <ul className="w-full space-y-4">
            {sidebarData?.map((sidebar, index) => (
              <li
                key={index}
                className="w-full flex justify-start items-center gap-3 ml-2"
              >
                <NavLink
                  to={sidebar.link}
                  onClick={() => handleLinkClick(sidebar.link)}
                  className={`flex items-end w-[calc(100%-1.9rem)] gap-2 px-6 py-3 rounded-2xl transition-all relative ${
                    activeLink === sidebar.link
                      ? "bg-[#5BAFEB] text-white"
                      : " text-black hover:bg-[#5BAFEB] hover:text-white"
                  }`}
                >
                  <span className="text-xl">{sidebar.icon}</span>
                  <span className="text-[11px] font-medium">
                    {sidebar.title}
                  </span>
                </NavLink>
              </li>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-8 py-3 w-full rounded-2xl text-black"
            >
              <IoLogOutOutline size={20} />
              <span className="text-[11px] font-medium text-black">Logout</span>
            </button>
          </ul>
        </div>
      </div>

      {isDrawerOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
