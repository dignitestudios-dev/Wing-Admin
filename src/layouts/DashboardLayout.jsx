import { Outlet } from "react-router";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { useEffect, useState } from "react";
import NoInternetModal from "../components/global/NoInternet";
import { NoInternetImage } from "../assets/export";

const DashboardLayout = () => {
  const [openNoInternet, setOpenNoInternet] = useState(false);

  useEffect(() => {
    if (!navigator.onLine) {
      // Handle no internet connection
      setOpenNoInternet(true);
    }
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-start items-start">
      <div className="w-full h-10">
        <Navbar />
      </div>
      <img src={NoInternetImage} alt="" className="hidden" />
      <div className="w-full overflow-y-hidden min-h-screen flex flex-col lg:flex-row justify-start items-start">
        <div className="w-full lg:w-60  lg:h-[calc(100%-2.5rem)]">
          <Sidebar />
        </div>
        <div className="w-full lg:w-[calc(100%-15rem)] h-[calc(100%-2.5rem)] p-4">
          <NoInternetModal isOpen={openNoInternet} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
