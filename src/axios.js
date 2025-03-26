import axios from "axios";
import { ErrorToast } from "./components/global/Toaster"; // Import your toaster functions
import Cookies from "js-cookie";
import { UAParser } from "ua-parser-js";
import { v4 as uuidv4 } from "uuid";
// import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const baseUrl = "https://api.wingxapp.com";
// export const baseUrl = "https://155e-45-199-187-86.ngrok-free.app";

// async function getDeviceFingerprint() {
//   const fp = await FingerprintJS.load();
//   const result = await fp.get();
//   console.log(result.visitorId); // Unique device ID
//   return result.visitorId;
// }

const getDeviceName = () => {
  const parser = new UAParser();
  const result = parser.getResult();

  const deviceName = result.device.model || "Unknown";
  const deviceID = result.ua || "Unknown"; // User-Agent can serve as a unique identifier

  return deviceName;
};

const getDeviceId = () => {
  const parser = new UAParser();
  const result = parser.getResult();
  const uuid = uuidv4();

  const deviceName = `${result.device.model}` || "Unknown";
  const deviceID = result.ua || "Unknown"; // User-Agent can serve as a unique identifier

  const preId = deviceName + uuid;

  return preId;
};

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    devicemodel:  getDeviceName(),
    deviceuniqueid:  getDeviceId(),
  },
  timeout: 10000, // 10 seconds timeout
});

instance.interceptors.request.use((request) => {
  const token = Cookies.get("token");
  if (!navigator.onLine) {
    // No internet connection
    ErrorToast(
      "No internet connection. Please check your network and try again."
    );
    return;
    // return Promise.reject(new Error("No internet connection"));
  }

  // Merge existing headers with token
  request.headers = {
    ...request.headers, // Keep existing headers like devicemodel and deviceuniqueid
    Accept: "application/json, text/plain, */*",
    ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization only if token exists
  };

  return request;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      // Slow internet or request timeout
      ErrorToast("Your internet connection is slow. Please try again.");
    }

    if (error.response && error.response.status === 401) {
      // Unauthorized error
      Cookies.remove("token");
      Cookies.remove("user");
      ErrorToast("Session expired. Please relogin");
      // window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default instance;