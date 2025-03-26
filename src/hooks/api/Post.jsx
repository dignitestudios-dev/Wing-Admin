import { useState } from "react";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";
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
        callback(response?.data, navigate); // Call the callback with response data
      }
      return response?.data;
    } catch (error) {
      processError(error); // Handle errors
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
        callback(response?.data, navigate); // Call the callback with response data
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
      const response = await axios.post(url, data); // Post the notification data
      if (typeof callback === "function") {
        callback(response?.data, navigate); // Call the callback with the response data
      }
      return response?.data;
    } catch (error) {
      processError(error); // Handle errors
    } finally {
      setLoading(false);
    }
  };

  return { loading, postNotificationData };
};

export { useNotification };
