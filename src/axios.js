import axios from "axios";
import { logout } from "./redux/slices/user";

export const serverURL = "http://26.3.189.182:8000";

const instance = axios.create({
  baseURL: serverURL,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem(
    "token"
  )}`;
  return config;
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        logout();
        window.localStorage.removeItem("token");
      }
      return Promise.reject(error);
    }
  );

export default instance;
