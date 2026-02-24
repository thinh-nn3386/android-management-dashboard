import type { Device, Enterprise, Policy } from 'android-management/resource';
import { create } from 'zustand';

interface EnterpriseState {
  // Enterprise info
  enterprise: Enterprise | null;

  // Policies under this enterprise
  policies: Policy[];
  lastSyncPolicies: number;

  // Devices under this enterprise
  devices: Device[];
  lastSyncDevices: number;

  // Enterprise actions
  setEnterprise: (enterprise: Enterprise | null) => void;

  // Policies actions
  setPolicies: (policies: Policy[]) => void;

  // Devices actions
  setDevices: (devices: Device[]) => void;

  // Clear all
  clearAll: () => void;
}

export const useEnterpriseStore = create<EnterpriseState>((set) => ({
  // Initial state
  enterprise: null,
  policies: [],
  lastSyncPolicies: 0,
  devices: [],
  lastSyncDevices: 0,

  // Enterprise actions
  setEnterprise: (enterprise) => set({ enterprise }),

  // Policies actions
  setPolicies: (policies) => set({ policies, lastSyncPolicies: Date.now() }),

  // Devices actions
  setDevices: (devices) => set({ devices, lastSyncDevices: Date.now() }),

  // Clear all when logging out
  clearAll: () =>
    set({
      enterprise: null,
      policies: [],
      lastSyncPolicies: 0,
      devices: [],
      lastSyncDevices: 0,
    }),
}));
