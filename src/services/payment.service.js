import api from "./api";

// Create Razorpay Order
export const createRazorpayOrder = async (orderId) => {
  const response = await api.post(`/payments/create-order/${orderId}`);
  return response.data;
};

// Verify Payment
export const verifyPayment = async (data) => {
  const response = await api.post("/payments/verify", data);
  return response.data;
};

// Payment Failed
export const paymentFailed = async (orderId) => {
  const response = await api.post("/payments/failure", {
    orderId,
  });

  return response.data;
};
