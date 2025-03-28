import { useState, useEffect } from "react";
import axios from "../../axios";
import Cookies from "js-cookie";
import { ErrorToast } from "../../components/global/Toaster";
import { processError } from "../../lib/utils";

const useUsers = (
  url,
  filter,
  currentPage = 1,
  update,
  search,
  age,
  maxAge,
  gender
) => {
  console.log("filter== ", filter);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const getUsers = async () => {
    try {
      let data;
      setLoading(true);
      // if (filter && Object.values(filter).some((value) => value)) {
      data = await axios.get(
        `${url}?startDate=${filter?.startDate}&endDate=${filter?.endDate}&search=${search}&minAge=${age}&maxAge=${maxAge}&gender=${gender}&page=${currentPage}`
      );
      // } else {
      // data = await axios.get(`${url}?page=${currentPage}`);
      // }

      setData(data?.data?.data);
      setPagination(data?.data?.data?.paginationDetails);
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPage, update]);

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

const useReports = (url, filter, search, currentPage = 1, update) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const getReports = async () => {
    try {
      let data;
      setLoading(true);
      data = await axios.get(
        `${url}?startDate=${filter?.startDate}&endDate=${filter?.endDate}&search=${search}&page=${currentPage}`
      );
      setData(data?.data?.data?.data);
      setPagination(data?.data?.data?.paginationDetails);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReports();
  }, [currentPage, update]);

  return { loading, data, pagination };
};

export { useReports };

const useDeletedUsers = (url, filter, search, currentPage = 1, update) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const getDeletedUsers = async () => {
    try {
      let data;
      setLoading(true);
      data = await axios.get(
        `${url}?startDate=${filter?.startDate}&endDate=${filter?.endDate}&search=${search}&page=${currentPage}`
      );
      setData(data?.data?.data?.data);
      setPagination(data?.data?.data?.paginationDetails);
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDeletedUsers();
  }, [currentPage, update]);

  return { loading, data, pagination };
};

export { useDeletedUsers };

const useLocationData = (url, filter, update) => {
  const [loading, setLoading] = useState(false);
  const [topLocations, setTopLocations] = useState([]);
  const [bottomLocations, setBottomLocations] = useState([]);

  const getLocationData = async () => {
    try {
      let data;
      setLoading(true);
      data = await axios.get(
        `${url}?startDate=${filter?.startDate}&endDate=${filter?.endDate}`
      );
      if (data?.data?.success) {
        setTopLocations(data?.data?.data?.top10 || []);
        setBottomLocations(data?.data?.data?.bottom10 || []);
      }
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocationData();
  }, [update]);

  return { loading, topLocations, bottomLocations };
};

export { useLocationData };

const useNotifications = (url, filter, search, currentPage = 1, update) => {
  console.log(filter, search, "filter and search");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const getNotifications = async () => {
    try {
      let data;
      setLoading(true);
      data = await axios.get(
        `${url}?startDate=${filter?.startDate}&endDate=${filter?.endDate}&search=${search}&page=${currentPage}`
      );
      setData(data?.data?.data);
      setPagination(data?.pagination || {});
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [currentPage, update]);

  return { loading, data, pagination };
};

export { useNotifications };

const useBlockedUsers = (
  url,
  filter,
  currentPage = 1,
  update,
  search,
  age,
  maxAge,
  gender
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const getBlockedUsers = async () => {
    try {
      let data;
      setLoading(true);
      data = await axios.get(
        `${url}?startDate=${filter?.startDate}&endDate=${filter?.endDate}&search=${search}&minAge=${age}&maxAge=${maxAge}&gender=${gender}&page=${currentPage}`
      );
      setData(data?.data?.data?.data || []);
      setPagination(data?.data?.data?.paginationDetails || {});
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlockedUsers();
  }, [currentPage, update]);

  return { loading, data, pagination };
};

export { useBlockedUsers };

const useMatches = (url, filter, search, currentPage = 1, update) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const getMatches = async () => {
    try {
      let data;
      setLoading(true);
      data = await axios.get(
        `${url}?startDate=${filter?.startDate}&endDate=${filter?.endDate}&search=${search}&page=${currentPage}`
      );

      setData(data?.data?.data);
      setPagination(data?.data?.data?.paginationDetails);
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMatches();
  }, [currentPage, update]);

  return { loading, data, pagination };
};

export { useMatches };
