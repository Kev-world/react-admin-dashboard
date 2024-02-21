import axios from "axios";
import { getToken } from "../Utilities/LocalStorage";

const headers = {
  "Content-Type": "application/json",
};

const BookingService = axios.create({
  baseURL: "http://localhost:5000/v1/bookings",
  headers: headers,
});

BookingService.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

BookingService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default BookingService;
