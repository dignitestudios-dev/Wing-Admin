import { useState, useEffect } from "react";
import axios from "../../axios";
import Cookies from "js-cookie";
import { ErrorToast } from "../../components/global/Toaster";
import { processError } from "../../lib/utils";

const useUsers = (url, currentPage = 1) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const getUsers = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${url}?page=${currentPage}`);
      setData(data?.data);
      setPagination(data?.pagination);
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  return { loading, data, pagination };
};

export { useUsers };

const useDashboardData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/admin/dashboard");
      setData(data?.data);
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return { loading, data };
};

export { useDashboardData };

const useReports = (url, currentPage = 1) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const getReports = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${url}?page=${currentPage}`);
      setData(data?.data?.data);
      setPagination(data?.data?.paginationDetails);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReports();
  }, [currentPage]);

  return { loading, data, pagination };
};

export { useReports };

const useDeletedUsers = (url, currentPage = 1) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const getDeletedUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}?page=${currentPage}`);
      setData(response?.data?.data?.data);
      setPagination(response?.data?.data?.paginationDetails);
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDeletedUsers();
  }, [currentPage]);

  return { loading, data, pagination };
};

export { useDeletedUsers };

const useLocationData = () => {
  const [loading, setLoading] = useState(false);
  const [topLocations, setTopLocations] = useState([]);
  const [bottomLocations, setBottomLocations] = useState([]);

  const getLocationData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/admin/location");
      if (response?.data?.success) {
        setTopLocations(response?.data?.data?.top10 || []);
        setBottomLocations(response?.data?.data?.bottom10 || []);
      }
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocationData();
  }, []);

  return { loading, topLocations, bottomLocations };
};

export { useLocationData };

const useNotifications = (url, currentPage = 1) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const getNotifications = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}?page=${currentPage}`);
      setData(data?.data);
      setPagination(data?.pagination || {});
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [currentPage]);

  return { loading, data, pagination };
};

export { useNotifications };

const useBlockedUsers = (url, currentPage = 1) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const getBlockedUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}?page=${currentPage}`);
      setData(data?.data?.data || []);
      setPagination(data?.data?.paginationDetails || {});
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlockedUsers();
  }, [currentPage]);

  return { loading, data, pagination };
};

export { useBlockedUsers };
