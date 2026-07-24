import api from "./api";

const BASE_URL = "/admin/settings/payment";

const settingsService = {
  getPaymentSettings: async () => {
    const response = await api.get(BASE_URL);
    return response.data;
  },

  updatePaymentSettings: async (payload) => {
    const response = await api.patch(BASE_URL, payload);
    return response.data;
  },

  testPaymentConnection: async () => {
    const response = await api.post(`${BASE_URL}/test`);
    return response.data;
  },
};

export default settingsService;
