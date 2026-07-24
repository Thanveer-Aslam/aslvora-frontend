import { create } from "zustand";

import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../services/cart.service";

const useCartStore = create((set, get) => ({
  // State
  cart: null,
  isLoading: false,
  error: null,

  // Loading
  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  // Error
  setError: (error) =>
    set({
      error,
    }),

  // Fetch Cart
  fetchCart: async () => {
    try {
      get().setLoading(true);
      get().setError(null);

      const response = await getCart();

      set({
        cart: response.data,
      });

      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to load cart.";

      get().setError(message);

      throw err;
    } finally {
      get().setLoading(false);
    }
  },

  // Add Item
  addItem: async (cartData) => {
    try {
      get().setLoading(true);
      get().setError(null);

      const response = await addToCart(cartData);

      set({
        cart: response.data,
      });

      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to add product.";

      get().setError(message);

      throw err;
    } finally {
      get().setLoading(false);
    }
  },

  // Update Item
  updateItem: async (itemId, quantity) => {
    try {
      get().setLoading(true);
      get().setError(null);

      const response = await updateCartItem(itemId, quantity);

      set({
        cart: response.data,
      });

      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update cart.";

      get().setError(message);

      throw err;
    } finally {
      get().setLoading(false);
    }
  },

  // Remove Item
  removeItem: async (itemId) => {
    try {
      get().setLoading(true);
      get().setError(null);

      const response = await removeCartItem(itemId);

      set({
        cart: response.data,
      });

      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to remove item.";

      get().setError(message);

      throw err;
    } finally {
      get().setLoading(false);
    }
  },

  // Clear Cart
  clearItems: async () => {
    try {
      get().setLoading(true);
      get().setError(null);

      const response = await clearCart();

      set({
        cart: response.data,
      });

      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to clear cart.";

      get().setError(message);

      throw err;
    } finally {
      get().setLoading(false);
    }
  },
}));

export default useCartStore;
