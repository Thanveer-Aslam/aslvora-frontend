import { useCallback, useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/category.service";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = async (categoryData) => {
    const response = await createCategory(categoryData);
    await fetchCategories();
    return response;
  };

  const editCategory = async (categoryId, categoryData) => {
    const response = await updateCategory(categoryId, categoryData);
    await fetchCategories();
    return response;
  };

  const removeCategory = async (categoryId) => {
    const response = await deleteCategory(categoryId);
    await fetchCategories();
    return response;
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    editCategory,
    removeCategory,
  };
};
