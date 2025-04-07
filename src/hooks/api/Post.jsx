import { useState } from "react";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { processError } from "../../lib/utils";
import { useNavigate } from "react-router";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const postData = async (
    url,
    isFormData = false,
    formdata = null,
    data = null,
    callback
  ) => {
    try {
      setLoading(true);
      const response = await axios.post(url, isFormData ? formdata : data);
      if (typeof callback === "function") {
        callback(response?.data, navigate);
      }
      return response?.data;
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, postData };
};

export { useLogin };

const useVerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const verifyOtp = async (
    url,
    isFormData = false,
    formdata = null,
    data = null,
    callback
  ) => {
    try {
      setLoading(true);
      const response = await axios.post(url, isFormData ? formdata : data);

      if (response?.data) {
        callback(response?.data, navigate);
      }
      return response?.data;
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, verifyOtp };
};

export { useVerifyOtp };

const useNotification = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const postNotificationData = async (url, data, callback) => {
    try {
      setLoading(true);
      const response = await axios.post(url, data);
      if (typeof callback === "function") {
        callback(response?.data, navigate);
      }
      return response?.data;
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, postNotificationData };
};

export { useNotification };

const useBlockUser = (setUpdate) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const blockUser = async (url, userData, callback) => {
    try {
      setLoading(true);
      const response = await axios.post(url, userData);

      if (response?.data) {
        callback(response?.data, navigate, setUpdate);
      }

      return response?.data;
    } catch (error) {
      processError(error);
      console.log(error, "error in block user");
    } finally {
      setLoading(false);
    }
  };

  const unblockUser = async (url, callback) => {
    try {
      setLoading(true);
      const response = await axios.post(url);

      if (response?.data) {
        callback(response?.data, navigate);
      }

      return response?.data;
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, blockUser, unblockUser };
};

export { useBlockUser };

const useResendOtp = () => {
  const [loading, setLoading] = useState(false);

  const resendOtp = async (url, phone, callback) => {
    try {
      setLoading(true);
      const response = await axios.post(url, { phone });
      console.log(response, "response");
      if (response?.data?.success) {
        callback(response?.data);
        SuccessToast("OTP resent successfully!"); // Display success message
      }
      return response?.data;
    } catch (error) {
      console.log(error, "error in resend otp");

      processError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, resendOtp };
};

export { useResendOtp };
