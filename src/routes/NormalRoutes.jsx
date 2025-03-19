import { Route, Routes } from "react-router";
import Home from "./../pages/app/Home";
import Users from "../pages/app/users/Users";
import DeletedUsers from "../pages/app/deleted/DeletedUsers";
import Reports from "../pages/app/reports/Reports";
import BlockedUsers from "../pages/app/blocked/BlockedUsers";
import Matches from "../pages/app/matches/Matches";
import Notifications from "./../pages/app/notifications/Notifications";
import CreateNotification from "./../pages/app/notifications/CreateNotification";
import Location from "./../pages/app/location/Location";
import DashboardLayout from "../layouts/DashboardLayout";

export const normalRoutes = [
  {
    title: "Dashboard",
    url: "dashboard",
    page: <Home />,
  },
  {
    title: "Users",
    url: "users",
    page: <Users />,
  },
  {
    title: "deleted",
    url: "deleted",
    page: <DeletedUsers />,
  },
  {
    title: "reports",
    url: "reports",
    page: <Reports />,
  },
  {
    title: "blocked",
    url: "blocked",
    page: <BlockedUsers />,
  },
  {
    title: "matches",
    url: "matches",
    page: <Matches />,
  },

  {
    title: "notifications",
    url: "notifications",
    page: <Notifications />,
  },
  {
    title: "create-notification",
    url: "create-notification",
    page: <CreateNotification />,
  },
  {
    title: "Location",
    url: "location",
    page: <Location />,
  },
  //   {
  //     title: "UpdatePassword",
  //     url: "/updatepassword",
  //     page: <DashboardLayout page={<UpdatePassword />} />,
  //   },
];
