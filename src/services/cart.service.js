import api from "./api";

// Add product to cart
export const addToCart = async (cartData) => {
  const response = await api.post("/cart", cartData);
  return response.data;
};

// Get logged-in user's cart
export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

// Update cart item quantity
export const updateCartItem = async (itemId, quantity) => {
  const response = await api.patch(`/cart/${itemId}`, {
    quantity,
  });

  return response.data;
};

// Remove single item from cart
export const removeCartItem = async (itemId) => {
  const response = await api.delete(`/cart/${itemId}`);
  return response.data;
};

// Clear entire cart
export const clearCart = async () => {
  const response = await api.delete("/cart");
  return response.data;
};
