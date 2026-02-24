import { useEnterpriseStore } from '@/stores/enterpriseStore';
import type { Device, Policy } from 'android-management/resource';

/**
 * Policies store helpers for optimistic updates
 */
export const usePoliciesUpdater = () => {
  const setPolicies = useEnterpriseStore((state) => state.setPolicies);
  const policies = useEnterpriseStore((state) => state.policies);

  return {
    addPolicy: (policy: Policy) => {
      setPolicies([policy, ...policies]);
    },
    updatePolicy: (updatedPolicy: Policy) => {
      setPolicies(policies.map((p) => (p.name === updatedPolicy.name ? updatedPolicy : p)));
    },
    deletePolicy: (name: string) => {
      setPolicies(policies.filter((p) => p.name !== name));
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
      setDevices([device, ...devices]);
    },
    updateDevice: (updatedDevice: Device) => {
      setDevices(devices.map((d) => (d.name === updatedDevice.name ? updatedDevice : d)));
    },
    deleteDevice: (name: string) => {
      setDevices(devices.filter((d) => d.name !== name));
    },
  };
};
