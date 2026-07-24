import { toast } from "sonner";

import {
  getWishlist as getWishlistApi,
  addToWishlist as addToWishlistApi,
  removeFromWishlist as removeFromWishlistApi,
} from "../services/wishlist.service";

import useWishlistStore from "../store/wishList";

const useWishlist = () => {
  const {
    wishlist,
    count,
    loading,
    setLoading,
    setWishlist,
    addProduct,
    removeProduct,
    isWishlisted,
    clearWishlist,
  } = useWishlistStore();

  // Get Wishlist
  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const { data } = await getWishlistApi();

      setWishlist(data.wishlist || []);

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch wishlist.");
    } finally {
      setLoading(false);
    }
  };

  // Add Product
  const addToWishlist = async (productId) => {
    try {
      const { data } = await addToWishlistApi(productId);

      const addedItem =
        data.wishlist.products?.find(
          (item) => item.product._id === productId,
        ) || data.wishlist.products?.at(-1);

      if (addedItem) {
        addProduct(addedItem);
      }

      toast.success(data.message);

      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add product to wishlist.",
      );
    }
  };

  // Remove Product
  const removeFromWishlist = async (productId) => {
    try {
      const { data } = await removeFromWishlistApi(productId);

      removeProduct(productId);

      toast.success(data.message);

      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to remove product from wishlist.",
      );
    }
  };

  return {
    wishlist,
    count,
    loading,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
    clearWishlist,
  };
};

export default useWishlist;
