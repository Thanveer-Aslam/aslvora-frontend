import api from "./api";

/* ==========================
   Dashboard
========================== */

export const getDashboard = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data.dashboard;
};

/* ==========================
   Orders
========================== */

// Get All Orders
export const getOrders = async (params = {}) => {
  const response = await api.get("/admin/orders", {
    params,
  });

  return response.data;
};

// Get Order By ID
export const getOrderById = async (orderId) => {
  const response = await api.get(`/admin/orders/${orderId}`);
  return response.data;
};

// Update Order Status
export const updateOrderStatus = async (orderId, data) => {
  const response = await api.patch(`/admin/orders/${orderId}/status`, data);

  return response.data;
};

// Cancel Order
export const cancelOrder = async (orderId) => {
  const response = await api.patch(`/admin/orders/${orderId}/cancel`);

  return response.data;
};

/* ==========================
   Customers
========================== */

// Get All Customers
export const getCustomers = async () => {
  const response = await api.get("/admin/customers");
  return response.data;
};

// Get Customer By ID
export const getCustomerById = async (customerId) => {
  const response = await api.get(`/admin/customers/${customerId}`);

  return response.data;
};

// Block Customer
export const blockCustomer = async (customerId) => {
  const response = await api.patch(`/admin/customers/${customerId}/block`);

  return response.data;
};

// Unblock Customer
export const unblockCustomer = async (customerId) => {
  const response = await api.patch(`/admin/customers/${customerId}/unblock`);

  return response.data;
};
