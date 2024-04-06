import { axiosPrivate } from "./axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
const sendRequest = async (method, url, data = null, params = {}) => {
  console.log(method, url, data);
  try {
    const response = await axiosPrivate({
      method,
      url,
      data: data,
      headers: { "Content-Type": "application/json" },
    });

    if (method === "GET") {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const useAxiosPrivate2 = () => {
  const refresh = useRefreshToken();
  const token = JSON.parse(localStorage.getItem("authState")).token;

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return sendRequest(
              prevRequest.method,
              prevRequest.url,
              prevRequest.data,
              prevRequest.params
            );
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, token]);

  return {
    sendRequest,
  };
};

export default useAxiosPrivate2;
