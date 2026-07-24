import api from "./api";

// Place Order
export const placeOrder = async (data) => {
  const response = await api.post("/orders", data);
  return response.data;
};

// Get My Orders
export const getMyOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

// Get Single Order
export const getOrderById = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

// Cancel Order
export const cancelOrder = async (orderId) => {
  const response = await api.patch(`/orders/${orderId}/cancel`);
  return response.data;
};
