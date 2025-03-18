import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="w-screen min-h-screen  flex justify-center items-center auth_bg ">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
