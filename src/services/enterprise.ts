import axiosClient from './axiosClient';
import type {
  EnterpriseLoginPayload,
  EnterpriseLoginResponse,
  MappingsResponse,
  MapEmailPayload,
  EnterpriseRegisterPayload,
  EnterpriseRegisterResponse,
} from '@/types/api';

export const enterpriseService = {
  // Check enterprise registration
  checkEnterpriseLogin: async (
    payload: EnterpriseLoginPayload
  ): Promise<EnterpriseLoginResponse> => {
    const response = await axiosClient.post('/api/v1/enterprise/login', payload);
    return response.data;
  },

  // Map email to enterprise
  mapEmailToEnterprise: async (payload: MapEmailPayload): Promise<{ status: string; message: string }> => {
    const response = await axiosClient.post('/api/v1/enterprise/map', payload);
    return response.data;
  },

  // Get all email-enterprise mappings
  getMappings: async (): Promise<MappingsResponse> => {
    const response = await axiosClient.get('/api/v1/enterprise/mappings');
    return response.data;
  },

  // Register new enterprise
  registerEnterprise: async (
    payload: EnterpriseRegisterPayload
  ): Promise<EnterpriseRegisterResponse> => {
    const response = await axiosClient.post('/api/v1/enterprise/register', payload);
    return response.data;
  },
};

export default enterpriseService;
