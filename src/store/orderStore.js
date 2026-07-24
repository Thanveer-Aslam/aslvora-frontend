import { create } from "zustand";

import {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
} from "../services/order.service";

const useOrderStore = create((set) => ({
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,

  fetchOrders: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await getMyOrders();

      set({
        orders: response.data || [],
        ordersPagination: {
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          totalOrders: response.totalOrders,
        },
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch orders.",
      });
    }
  },

  fetchOrderById: async (orderId) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await getOrderById(orderId);

      set({
        selectedOrder: response.data,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch order.",
      });
    }
  },

  createOrder: async (data) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await placeOrder(data);

      set({
        loading: false,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to place order.",
      });

      throw error;
    }
  },

  cancelUserOrder: async (orderId) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await cancelOrder(orderId);

      await useOrderStore.getState().fetchOrders();

      set({
        loading: false,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to cancel order.",
      });

      throw error;
    }
  },

  clearSelectedOrder: () =>
    set({
      selectedOrder: null,
    }),

  clearError: () =>
    set({
      error: null,
    }),
}));

export default useOrderStore;
