import { create } from 'zustand';
import type { EnterpriseInfo, Policy, Device } from '@/types/api';

interface EnterpriseState {
  // Enterprise info
  enterprise: EnterpriseInfo | null;

  // Policies under this enterprise
  policies: Policy[];

  // Devices under this enterprise
  devices: Device[];

  // Enterprise actions
  setEnterprise: (enterprise: EnterpriseInfo) => void;
  clearEnterprise: () => void;

  // Policies actions
  setPolicies: (policies: Policy[]) => void;
  clearPolicies: () => void;

  // Devices actions
  setDevices: (devices: Device[]) => void;
  clearDevices: () => void;

  // Clear all
  clearAll: () => void;
}

export const useEnterpriseStore = create<EnterpriseState>((set) => ({
  // Initial state
  enterprise: null,
  policies: [],
  devices: [],

  // Enterprise actions
  setEnterprise: (enterprise) => set({ enterprise }),
  clearEnterprise: () => set({ enterprise: null }),

  // Policies actions
  setPolicies: (policies) => set({ policies }),
  clearPolicies: () => set({ policies: [] }),

  // Devices actions
  setDevices: (devices) => set({ devices }),
  clearDevices: () => set({ devices: [] }),

  // Clear all when logging out
  clearAll: () =>
    set({
      enterprise: null,
      policies: [],
      devices: [],
    }),
}));
