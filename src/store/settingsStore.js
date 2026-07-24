import { create } from "zustand";
import settingsService from "../services/setting.service";

const useSettingsStore = create((set) => ({
  paymentSettings: null,

  loading: false,
  saving: false,
  testing: false,

  fetchPaymentSettings: async () => {
    try {
      set({ loading: true });

      const response = await settingsService.getPaymentSettings();

      set({
        paymentSettings: response.data,
      });
    } finally {
      set({ loading: false });
    }
  },

  updatePaymentSettings: async (payload) => {
    try {
      set({ saving: true });

      const response = await settingsService.updatePaymentSettings(payload);

      set({
        paymentSettings: response.data,
      });

      return response;
    } finally {
      set({ saving: false });
    }
  },

  testPaymentConnection: async () => {
    try {
      set({ testing: true });

      return await settingsService.testPaymentConnection();
    } finally {
      set({ testing: false });
    }
  },
}));

export default useSettingsStore;
