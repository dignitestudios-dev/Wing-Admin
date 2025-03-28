import { RxDashboard } from "react-icons/rx";
import { PiUsersThree } from "react-icons/pi";
import { RiHeartsLine } from "react-icons/ri";
import { CiSquareInfo } from "react-icons/ci";
import { LiaUserSlashSolid } from "react-icons/lia";
import { TiWarningOutline } from "react-icons/ti";
import { BiUserX } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { MdLockOpen } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { TbInfoSquare } from "react-icons/tb";

export const sidebarData = [
  {
    title: "Dashboard",
    icon: <RxDashboard />,
    link: "/app/dashboard",
  },
  {
    title: "Users",
    icon: <PiUsersThree />,
    link: "/app/users",
  },
  {
    title: "Matches",
    icon: <RiHeartsLine />,
    link: "/app/matches",
  },

  {
    title: "Push Notifications",
    icon: <TbInfoSquare />,
    link: "/app/notifications",
  },

  {
    title: "Deleted/Deactivated Users",
    icon: <LiaUserSlashSolid />,
    link: "/app/deleted",
  },

  {
    title: "Reported Users",
    icon: <TiWarningOutline />,
    link: "/app/reports",
  },
  {
    title: "Blocked Users",
    icon: <BiUserX />,
    link: "/app/blocked",
  },
  {
    title: "Location",
    icon: <IoLocationOutline />,
    link: "/app/location",
  },
  // {
  //   title: "Update Password",
  //   icon: <MdLockOpen />,
  //   link: "/app/updatepassword",
  // },
];
