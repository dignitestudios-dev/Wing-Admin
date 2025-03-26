import { useState } from "react";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";
import { processError } from "../../lib/utils";
import { useNavigate } from "react-router";

const useUnblockUser = (setUpdate) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const unblockUser = async (url, callback) => {
    try {
      setLoading(true);
      const response = await axios.delete(url);

      if (response?.data) {
        callback(response?.data, navigate, setUpdate);
      }

      return response?.data;
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, unblockUser };
};

export { useUnblockUser };
