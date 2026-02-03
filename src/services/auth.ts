import axiosClient from './axiosClient';
import type {
  AuthCredentials,
  AuthResponse,
  RegisterResponse,
  AuthStatusResponse,
  HealthCheckResponse,
  ApiStatusResponse,
} from '@/types/api';

// Public endpoints
export const authService = {
  // Health check
  healthCheck: async (): Promise<HealthCheckResponse> => {
    const response = await axiosClient.get('/health');
    return response.data;
  },

  // API status
  apiStatus: async (): Promise<ApiStatusResponse> => {
    const response = await axiosClient.get('/api/v1/status');
    return response.data;
  },

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

  // Check auth status
  checkAuthStatus: async (): Promise<AuthStatusResponse> => {
    const response = await axiosClient.get('/api/v1/auth/status');
    return response.data;
  },

  // Get stored auth token
  getAuthToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  // Get stored user email
  getUserEmail: (): string | null => {
    return localStorage.getItem('userEmail');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },
};

export default authService;
