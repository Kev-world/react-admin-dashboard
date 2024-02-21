import axios from "axios";
import { getToken } from "../Utilities/LocalStorage";

const headers = {
  "Content-Type": "application/json",
};

const AdminService = axios.create({
  baseURL: "http://localhost:5000/v1/admin",
  headers: headers,
});

AdminService.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

AdminService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default AdminService;
