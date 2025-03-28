import { useNavigate } from "react-router";
import { ErrorToast, SuccessToast } from "../components/global/Toaster";
import Cookies from "js-cookie";


export const processSignup = (data, navigate) => {
  if (data?.success) {
    navigate("/app/dashboard");
    return;
  }
};

export const processLogin = (data, navigate) => {  
  if (data?.success) {
    Cookies.set("phone", data?.data?.userRecord?.phone, { expires: 7 });
            Cookies.set(
              "fcmToken",
              "f9niv2k8QM2Rz8SoS8DYmP:APA91bFmyxUdBQH-P3iZtPE-S-loCdG4JN8y7gJ0wdQzMAI0O7yaV8OSPGAiQyZTtwXDsXBTCbphLcGzD83MSdPkUi17y6ScFV0PqXhc8m9mVP5p70aaR10ajJPXHJFvBU-Q8gt9G3_3"
            );
            Cookies.set("devinavigateceIdentity", "unique-device_1234", { expires: 7 });
    navigate("/auth/verify-otp");
    return;
  }
};


export const processOtp = (data, navigate) => {
  console.log("authtoken check",data, data.token)
  if (data?.success) {
    Cookies.set("authToken", data?.data?.token, { expires: 7 });
    navigate("/app/dashboard");
  } else {
    ErrorToast("OTP verification failed. Please try again.");
  }
};


export const processblockUser = (data,navigate , setUpdate ) => {
  if (data?.success) {
    SuccessToast("User Blocked Successfully");
    setUpdate((prev) =>!prev)

  } else {
    ErrorToast("Cannot unblock user. Please try again.");
  }
};

export const processunblockUser = (data, navigate , setUpdate) => {
  if (data?.success) {
    SuccessToast("User unblocked Successfully");
    setUpdate((prev) =>!prev)
  } else {
    ErrorToast("Cannot block user. Please try again.");
  }
};



export const processError = (error) => {
  console.log('error', error);
  if (error?.response?.data?.message) {
    ErrorToast(error?.response?.data?.message);
    return;
  } else {
    ErrorToast("Something went wrong");
  }
};



export const processNotification = (data, navigate) => {
  if (data?.success) {
    SuccessToast("Notification created successfully");
    // navigate("app/notifications");
  } else {
    ErrorToast("Notification creation failed. Please try again.");
  }
};
