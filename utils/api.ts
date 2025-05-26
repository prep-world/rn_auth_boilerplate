import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import { router } from "expo-router";
import { useAuthStore } from "@/store/useAuthStore";

const API_URL =
   process.env.EXPO_PUBLIC_API_URL || "http://192.168.137.107:5000/api/v1";

const commonHeaders = {
   "Content-Type": "application/json",
};

const unauthorizedAxiosInstance: AxiosInstance = axios.create({
   baseURL: API_URL,
   headers: commonHeaders,
});

const authorizedAxiosInstance: AxiosInstance = axios.create({
   baseURL: API_URL,
   headers: commonHeaders,
});

authorizedAxiosInstance.interceptors.request.use(
   async (config) => {
      const token = await AsyncStorage.getItem("auth_token");
      if (token) {
         config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
   },
   (error) => Promise.reject(error)
);

authorizedAxiosInstance.interceptors.response.use(
   (response) => response.data,
   async (error) => {
      if (error.response?.status === 401) {
         await AsyncStorage.removeItem("auth_token");
         useAuthStore.getState().setIsAuthenticated(false);
         useAuthStore.getState().setUser(null);
         router.replace("/login");
      }
      throw error;
   }
);

unauthorizedAxiosInstance.interceptors.response.use(
   (response) => response.data,
   (error) => Promise.reject(error)
);

export const unauthorizedAPI = unauthorizedAxiosInstance;
export const authorizedAPI = authorizedAxiosInstance;
