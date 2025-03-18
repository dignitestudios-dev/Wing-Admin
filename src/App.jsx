import { Route, Routes } from "react-router";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/app/Home";
import Login from "./pages/authentication/Login";
import AuthLayout from "./layouts/AuthLayout";
import Users from "./pages/app/users/Users";
import DeletedUsers from "./pages/app/deleted/DeletedUsers";
import Reports from "./pages/app/reports/Reports";
import BlockedUsers from "./pages/app/blocked/BlockedUsers";
import Matches from "./pages/app/matches/Matches";
import Notifications from "./pages/app/notifications/Notifications";
import Location from "./pages/app/location/Location";
import UpdatePassword from "./pages/app/updatepassword/UpdatePassword";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import VerifyOtp from "./pages/authentication/VerifyOtp";
import ResetPassword from "./pages/authentication/ResetPassword";
import CreateNotification from "./pages/app/notifications/CreateNotification";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="app" element={<DashboardLayout />}>
        <Route path="dashboard" element={<Home />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="users" element={<Users />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="deleted" element={<DeletedUsers />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="reports" element={<Reports />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="blocked" element={<BlockedUsers />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="matches" element={<Matches />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="notifications" element={<Notifications />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="create-notification" element={<CreateNotification />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="location" element={<Location />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="updatepassword" element={<UpdatePassword />} />
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="verify-otp" element={<VerifyOtp />} />
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>

      <Route
        path="*"
        element={<div className="text-7xl">Page Not Found</div>}
      />
    </Routes>
  );
}

export default App;
