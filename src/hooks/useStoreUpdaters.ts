import { useEnterpriseStore } from '@/stores/enterpriseStore';
import type { Policy, Device } from '@/types/api';

/**
 * Policies store helpers for optimistic updates
 */
export const usePoliciesUpdater = () => {
  const setPolicies = useEnterpriseStore((state) => state.setPolicies);
  const policies = useEnterpriseStore((state) => state.policies);

  return {
    addPolicy: (policy: Policy) => {
      setPolicies([...policies, policy]);
    },
    updatePolicy: (updatedPolicy: Policy) => {
      setPolicies(
        policies.map((p) => (p.policy_id === updatedPolicy.policy_id ? updatedPolicy : p)),
      );
    },
    deletePolicy: (policyId: string) => {
      setPolicies(policies.filter((p) => p.policy_id !== policyId));
    },
    replaceAll: (newPolicies: Policy[]) => {
      setPolicies(newPolicies);
    },
  };
};

/**
 * Devices store helpers for optimistic updates
 */
export const useDevicesUpdater = () => {
  const setDevices = useEnterpriseStore((state) => state.setDevices);
  const devices = useEnterpriseStore((state) => state.devices);

  return {
    addDevice: (device: Device) => {
      setDevices([...devices, device]);
    },
    updateDevice: (updatedDevice: Device) => {
      setDevices(devices.map((d) => (d.device_id === updatedDevice.device_id ? updatedDevice : d)));
    },
    deleteDevice: (deviceId: string) => {
      setDevices(devices.filter((d) => d.device_id !== deviceId));
    },
    replaceAll: (newDevices: Device[]) => {
      setDevices(newDevices);
    },
  };
};
