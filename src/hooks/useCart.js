import { useEffect } from "react";
import useCartStore from "../store/cartStore";

const useCart = () => {
  const cart = useCartStore((state) => state.cart);
  const loading = useCartStore((state) => state.isLoading);
  const error = useCartStore((state) => state.error);

  const fetchCart = useCartStore((state) => state.fetchCart);
  const addItem = useCartStore((state) => state.addItem);
  const updateItem = useCartStore((state) => state.updateItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearItems = useCartStore((state) => state.clearItems);

  useEffect(() => {
    if (!cart) {
      fetchCart();
    }
  }, [cart, fetchCart]);

  return {
    cart,
    loading,
    error,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    clearItems,
  };
};

export default useCart;
