import { create } from "zustand";
import {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../services/address.service";

const useAddressStore = create((set) => ({
  addresses: [],
  selectedAddress: null,
  loading: false,
  error: null,

  // Get All Addresses
  fetchAddresses: async () => {
    try {
      set({ loading: true, error: null });

      const response = await getAddresses();

      set({
        addresses: response.addresses || [],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch addresses.",
      });
    }
  },

  // Get Single Address
  fetchAddressById: async (addressId) => {
    try {
      set({ loading: true, error: null });

      const response = await getAddressById(addressId);

      set({
        selectedAddress: response.address,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch address.",
      });
    }
  },

  // Create Address
  addAddress: async (addressData) => {
    try {
      set({ loading: true, error: null });

      await createAddress(addressData);

      const response = await getAddresses();

      set({
        addresses: response.addresses || [],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to create address.",
      });
    }
  },

  // Update Address
  editAddress: async (addressId, addressData) => {
    try {
      set({ loading: true, error: null });

      await updateAddress(addressId, addressData);

      const response = await getAddresses();

      set({
        addresses: response.addresses || [],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to update address.",
      });
    }
  },

  // Delete Address
  removeAddress: async (addressId) => {
    try {
      set({ loading: true, error: null });

      await deleteAddress(addressId);

      const response = await getAddresses();

      set({
        addresses: response.addresses || [],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to delete address.",
      });
    }
  },

  // Set Default Address
  makeDefaultAddress: async (addressId) => {
    try {
      set({ loading: true, error: null });

      await setDefaultAddress(addressId);

      const response = await getAddresses();

      set({
        addresses: response.addresses || [],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error:
          error.response?.data?.message || "Failed to set default address.",
      });
    }
  },

  clearSelectedAddress: () => {
    set({
      selectedAddress: null,
    });
  },

  clearError: () => {
    set({
      error: null,
    });
  },
}));

export default useAddressStore;
