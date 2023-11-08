import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BE_URL,
  headers: {
    "Content-Type": "application/json",
    timeout: 10000,
  },
});

export default AxiosInstance;
