import axios from "axios";
const BASE_URL = "https://localhost:7179/api/";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { accept: "*/*" },
  // withCredentials: true,
});
