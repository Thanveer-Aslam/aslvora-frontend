import { useCallback, useEffect, useState } from "react";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.service";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts(params);

      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (formData) => {
    const response = await createProduct(formData);

    await fetchProducts();

    return response;
  };

  const editProduct = async (productId, formData) => {
    const response = await updateProduct(productId, formData);

    await fetchProducts();

    return response;
  };

  const removeProduct = async (productId) => {
    const response = await deleteProduct(productId);

    await fetchProducts();

    return response;
  };

  return {
    products,
    loading,
    error,

    fetchProducts,

    addProduct,
    editProduct,
    removeProduct,
  };
};
