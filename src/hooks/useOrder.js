import useOrderStore from "../store/orderStore";

const useOrder = () => {
  const {
    orders,
    selectedOrder,
    loading,
    error,
    fetchOrders,
    fetchOrderById,
    createOrder,
    cancelUserOrder,
    clearSelectedOrder,
    clearError,
  } = useOrderStore();

  return {
    orders,
    selectedOrder,
    loading,
    error,
    fetchOrders,
    fetchOrderById,
    createOrder,
    cancelUserOrder,
    clearSelectedOrder,
    clearError,
  };
};

export default useOrder;
