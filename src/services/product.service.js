import api from "./api";

// Get All Products
export const getProducts = async (params = {}) => {
  const response = await api.get("/products", {
    params,
  });

  return response.data.data;
};

// Get Product By Id
export const getProductById = async (productId) => {
  const response = await api.get(`/products/${productId}`);

  return response.data.data;
};

// Create Product
export const createProduct = async (formData) => {
  const response = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update Product
export const updateProduct = async (productId, formData) => {
  const response = await api.put(`/products/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete Product
export const deleteProduct = async (productId) => {
  const response = await api.delete(`/products/${productId}`);

  return response.data;
};
