import axiosClient from './axiosClient';
import type {
  PoliciesResponse,
  CreatePolicyPayload,
  PolicyResponse,
  DeletePolicyPayload,
} from '@/types/api';

export const policyService = {
  // List all policies for an enterprise
  listPolicies: async (enterpriseName: string): Promise<PoliciesResponse> => {
    const response = await axiosClient.get('/api/v1/policies', {
      params: {
        enterprise_name: enterpriseName,
      },
    });
    return response.data;
  },

  // Create or update a policy
  createOrUpdatePolicy: async (payload: CreatePolicyPayload): Promise<PolicyResponse> => {
    const response = await axiosClient.post('/api/v1/policies', payload);
    return response.data;
  },

  // Delete a policy
  deletePolicy: async (payload: DeletePolicyPayload): Promise<{ status: string; message: string }> => {
    const response = await axiosClient.delete('/api/v1/policies', {
      params: {
        enterprise_name: payload.enterprise_name,
        policy_name: payload.policy_name,
      },
    });
    return response.data;
  },
};

export default policyService;
