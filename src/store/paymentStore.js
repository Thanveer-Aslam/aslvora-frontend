import { create } from "zustand";

import {
  createRazorpayOrder,
  verifyPayment,
  paymentFailed,
} from "../services/payment.service";

const usePaymentStore = create((set) => ({
  loading: false,
  error: null,

  /**
   * Create Razorpay Order
   */
  createPaymentOrder: async (orderId) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await createRazorpayOrder(orderId);

      set({
        loading: false,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error:
          error.response?.data?.message || "Failed to create Razorpay order.",
      });

      throw error;
    }
  },

  /**
   * Verify Payment
   */
  verifyPayment: async (paymentData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await verifyPayment(paymentData);

      set({
        loading: false,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Payment verification failed.",
      });

      throw error;
    }
  },

  /**
   * Mark Payment Failed
   */
  paymentFailed: async (orderId) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await paymentFailed(orderId);

      set({
        loading: false,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error:
          error.response?.data?.message || "Failed to update payment status.",
      });

      throw error;
    }
  },

  /**
   * Clear Error
   */
  clearError: () =>
    set({
      error: null,
    }),
}));

export default usePaymentStore;
