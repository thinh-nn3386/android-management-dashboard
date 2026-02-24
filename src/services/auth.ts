import type { ApiResponseType } from './api.types';
import axiosClient from './axiosClient';

// Public endpoints
export const authApi = {
  // Register new user
  register: async (payload: { email: string; password: string }): Promise<ApiResponseType> => {
    const response = await axiosClient.post('/api/v1/register', payload);
    return response.data;
  },

  // Login user
  login: async (payload: {
    email: string;
    password: string;
  }): Promise<ApiResponseType<{ token: string; email: string }>> => {
    const response = await axiosClient.post('/api/v1/login', payload);
    const data = response.data;

    // Store token and email in localStorage
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userEmail', data.email);
    }

    return data;
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
  },
};
