import axiosClient from './axiosClient';
import type {
  EnterpriseLoginPayload,
  EnterpriseLoginResponse,
  EnterpriseRegisterPayload,
  EnterpriseRegisterResponse,
  EnterpriseSignUpUrlPayload,
  EnterpriseSignUpUrlResponse,
} from '@/types/api';

export const enterpriseService = {
  // Check enterprise registration
  login: async (payload: EnterpriseLoginPayload): Promise<EnterpriseLoginResponse> => {
    const response = await axiosClient.post('/api/v1/enterprise/login', payload);
    return response.data;
  },

  createSignupUrl: async (
    payload: EnterpriseSignUpUrlPayload,
  ): Promise<EnterpriseSignUpUrlResponse> => {
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
