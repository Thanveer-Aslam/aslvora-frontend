import { create } from "zustand";

import {
  getDashboard,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getCustomers,
  getCustomerById,
  blockCustomer,
  unblockCustomer,
} from "../services/admin.service";

const useAdminStore = create((set) => ({
  /* ==========================
     State
  ========================== */

  dashboard: null,

  orders: [],
  selectedOrder: null,

  customers: [],
  selectedCustomer: null,

  loading: false,
  error: null,

  /* ==========================
     Dashboard
  ========================== */

  fetchDashboard: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const dashboard = await getDashboard();

      set({
        dashboard,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch dashboard.",
      });
    }
  },

  /* ==========================
     Orders
  ========================== */

  fetchOrders: async (params = {}) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await getOrders(params);

      set({
        orders: response.data || [],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch orders.",
      });
    }
  },

  fetchOrder: async (orderId) => {
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

  changeOrderStatus: async (orderId, data) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await updateOrderStatus(orderId, data);

      await useAdminStore.getState().fetchOrders();

      if (useAdminStore.getState().selectedOrder?._id === orderId) {
        await useAdminStore.getState().fetchOrder(orderId);
      }

      set({
        loading: false,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error:
          error.response?.data?.message || "Failed to update order status.",
      });

      throw error;
    }
  },

  cancelAdminOrder: async (orderId) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await cancelOrder(orderId);

      await useAdminStore.getState().fetchOrders();

      if (useAdminStore.getState().selectedOrder?._id === orderId) {
        await useAdminStore.getState().fetchOrder(orderId);
      }

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

  /* ==========================
     Customers
  ========================== */

  fetchCustomers: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await getCustomers();

      set({
        customers: response.customers || [],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch customers.",
      });
    }
  },

  fetchCustomerById: async (customerId) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await getCustomerById(customerId);

      set({
        selectedCustomer: response.customer,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch customer.",
      });
    }
  },

  blockUser: async (customerId) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await blockCustomer(customerId);

      await useAdminStore.getState().fetchCustomers();

      set({
        loading: false,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to block customer.",
      });

      throw error;
    }
  },

  unblockUser: async (customerId) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await unblockCustomer(customerId);

      await useAdminStore.getState().fetchCustomers();

      set({
        loading: false,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to unblock customer.",
      });

      throw error;
    }
  },

  /* ==========================
     Utilities
  ========================== */

  clearSelectedOrder: () =>
    set({
      selectedOrder: null,
    }),

  clearSelectedCustomer: () =>
    set({
      selectedCustomer: null,
    }),

  clearError: () =>
    set({
      error: null,
    }),
}));

export default useAdminStore;
