import { useEffect } from "react";
import useAdminStore from "../store/adminStore";

const useAdmin = (options = {}) => {
  const {
    dashboard: loadDashboard = false,
    orders: loadOrders = false,
    customers: loadCustomers = false,
  } = options;

  const {
    // State
    dashboard,

    orders,
    selectedOrder,

    customers,
    selectedCustomer,

    loading,
    error,

    // Dashboard
    fetchDashboard,

    // Orders
    fetchOrders,
    fetchOrderById,
    changeOrderStatus,
    cancelAdminOrder,

    // Customers
    fetchCustomers,
    fetchCustomerById,
    blockUser,
    unblockUser,

    // Utilities
    clearSelectedOrder,
    clearSelectedCustomer,
    clearError,
  } = useAdminStore();

  useEffect(() => {
    if (loadDashboard) {
      fetchDashboard();
    }

    if (loadOrders) {
      fetchOrders();
    }

    if (loadCustomers) {
      fetchCustomers();
    }
  }, [
    loadDashboard,
    loadOrders,
    loadCustomers,
    fetchDashboard,
    fetchOrders,
    fetchCustomers,
  ]);

  return {
    // State
    dashboard,

    orders,
    selectedOrder,

    customers,
    selectedCustomer,

    loading,
    error,

    // Dashboard
    fetchDashboard,

    // Orders
    fetchOrders,
    fetchOrderById,
    changeOrderStatus,
    cancelAdminOrder,

    // Customers
    fetchCustomers,
    fetchCustomerById,
    blockUser,
    unblockUser,

    // Utilities
    clearSelectedOrder,
    clearSelectedCustomer,
    clearError,
  };
};

export default useAdmin;
