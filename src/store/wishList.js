import { create } from "zustand";

const useWishlistStore = create((set, get) => ({
  // State
  wishlist: [],
  count: 0,
  loading: false,

  // Loading
  setLoading: (loading) =>
    set({
      loading,
    }),

  // Set Wishlist
  setWishlist: (wishlist) =>
    set({
      wishlist,
      count: wishlist.length,
      loading: false,
    }),

  // Add Product
  addProduct: (item) => {
    const { wishlist } = get();

    const exists = wishlist.some(
      (wishlistItem) => wishlistItem.product._id === item.product._id,
    );

    if (exists) return;

    const updatedWishlist = [...wishlist, item];

    set({
      wishlist: updatedWishlist,
      count: updatedWishlist.length,
    });
  },

  // Remove Product
  removeProduct: (productId) => {
    const { wishlist } = get();

    const updatedWishlist = wishlist.filter(
      (item) => item.product._id !== productId,
    );

    set({
      wishlist: updatedWishlist,
      count: updatedWishlist.length,
    });
  },

  // Check Wishlist
  isWishlisted: (productId) => {
    return get().wishlist.some((item) => item.product._id === productId);
  },

  // Clear Wishlist
  clearWishlist: () =>
    set({
      wishlist: [],
      count: 0,
      loading: false,
    }),
}));

export default useWishlistStore;
