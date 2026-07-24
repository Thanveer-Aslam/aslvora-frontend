import usePaymentStore from "../store/paymentStore";

const usePayment = () => {
  const {
    loading,
    error,
    createPaymentOrder,
    verifyPayment,
    paymentFailed,
    clearError,
  } = usePaymentStore();

  return {
    loading,
    error,
    createPaymentOrder,
    verifyPayment,
    paymentFailed,
    clearError,
  };
};

export default usePayment;
