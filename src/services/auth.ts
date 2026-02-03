import axiosClient from './axiosClient';
import type { AuthCredentials, AuthResponse, RegisterResponse } from '@/types/api';

// Public endpoints
export const authService = {
  // Register new user
  register: async (credentials: AuthCredentials): Promise<RegisterResponse> => {
    const response = await axiosClient.post('/api/v1/register', credentials);
    return response.data;
  },

  // Login user
  login: async (credentials: AuthCredentials): Promise<AuthResponse> => {
    const response = await axiosClient.post('/api/v1/login', credentials);
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

export default authService;
