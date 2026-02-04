import axiosClient from './axiosClient';
import type {
  EnterpriseLoginResponse,
  EnterpriseRegisterPayload,
  EnterpriseRegisterResponse,
  EnterpriseSignUpUrlResponse,
} from '@/types/api';

export const enterpriseService = {
  // Check enterprise registration
  login: async (): Promise<EnterpriseLoginResponse> => {
    const response = await axiosClient.post('/api/v1/enterprise/login');
    return response.data;
  },

  createSignupUrl: async (payload: {
    callback_url: string;
  }): Promise<EnterpriseSignUpUrlResponse> => {
    const response = await axiosClient.post('/api/v1/enterprise/signup-url', payload);
    return response.data;
  },

  // Register new enterprise
  register: async (payload: EnterpriseRegisterPayload): Promise<EnterpriseRegisterResponse> => {
    const response = await axiosClient.post('/api/v1/enterprise/register', payload);
    return response.data;
  },
};

export default enterpriseService;
