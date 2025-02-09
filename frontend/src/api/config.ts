import axios, { AxiosRequestConfig } from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/token/refresh/`,
          { refresh: refreshToken }
        );

        if (response.status === 200) {
          localStorage.setItem(ACCESS_TOKEN, response.data.access);
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.access}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const api = {
  get: <T>(endpoint: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<T>(endpoint, config).then((response) => response.data),

  post: <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(endpoint, data, config).then((response) => response.data),

  put: <T>(endpoint: string, data: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.put<T>(endpoint, data, config).then((response) => response.data),

  patch: <T>(endpoint: string, data: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.patch<T>(endpoint, data, config).then((response) => response.data),

  delete: <T>(endpoint: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<T>(endpoint, config).then((response) => response.data),
};

export default axiosInstance;
