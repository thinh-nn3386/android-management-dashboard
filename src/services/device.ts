import axiosClient from './axiosClient';
import type {
  DevicesResponse,
  DeviceDetailResponse,
  EnrollmentTokenPayload,
  EnrollmentTokenResponse,
  DeleteDevicePayload,
} from '@/types/api';

export const deviceService = {
  // List all devices for an enterprise
  listDevices: async (enterpriseName: string): Promise<DevicesResponse> => {
    const response = await axiosClient.get('/api/v1/devices', {
      params: {
        enterprise_name: enterpriseName,
      },
    });
    return response.data;
  },

  // Get single device details
  getDevice: async (deviceId: string, enterpriseName: string): Promise<DeviceDetailResponse> => {
    const response = await axiosClient.get(`/api/v1/devices/${deviceId}`, {
      params: {
        enterprise_name: enterpriseName,
      },
    });
    return response.data;
  },

  // Create enrollment token for device provisioning
  createEnrollmentToken: async (payload: EnrollmentTokenPayload): Promise<EnrollmentTokenResponse> => {
    const response = await axiosClient.post('/api/v1/devices/enrollment-token', payload);
    return response.data;
  },

  // Delete a device
  deleteDevice: async (payload: DeleteDevicePayload): Promise<{ status: string; message: string }> => {
    const response = await axiosClient.delete(`/api/v1/devices/${payload.device_id}`, {
      params: {
        enterprise_name: payload.enterprise_name,
      },
    });
    return response.data;
  },
};

export default deviceService;
