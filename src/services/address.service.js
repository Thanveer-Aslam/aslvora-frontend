import api from "./api";

/**
 * Create Address
 */
export const createAddress = async (addressData) => {
  const response = await api.post("/address", addressData);
  return response.data;
};

/**
 * Get All Addresses
 */
export const getAddresses = async () => {
  const response = await api.get("/address");
  return response.data;
};

/**
 * Get Single Address
 */
export const getAddressById = async (addressId) => {
  const response = await api.get(`/address/${addressId}`);
  return response.data;
};

/**
 * Update Address
 */
export const updateAddress = async (addressId, addressData) => {
  const response = await api.patch(`/address/${addressId}`, addressData);
  return response.data;
};

/**
 * Delete Address
 */
export const deleteAddress = async (addressId) => {
  const response = await api.delete(`/address/${addressId}`);
  return response.data;
};

/**
 * Set Default Address
 */
export const setDefaultAddress = async (addressId) => {
  const response = await api.patch(`/address/${addressId}/default`);
  return response.data;
};
