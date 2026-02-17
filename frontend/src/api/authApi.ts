import type { LoginCredentials, SignUpData } from "../utils/types";
import axiosInstance from "./apiClient";

export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },

  signup: async (data: SignUpData) => {
    const response = await axiosInstance.post('/auth/signup', data);
    return response.data;
  },

  getProfile: async () => {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<SignUpData>) => {
    const response = await axiosInstance.put('/auth/profile', data);
    return response.data;
  },
};