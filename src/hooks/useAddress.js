import useAddressStore from "../store/addressStore";

const useAddress = () => {
  const addresses = useAddressStore((state) => state.addresses);
  const selectedAddress = useAddressStore((state) => state.selectedAddress);
  const loading = useAddressStore((state) => state.loading);
  const error = useAddressStore((state) => state.error);

  const fetchAddresses = useAddressStore((state) => state.fetchAddresses);

  const fetchAddressById = useAddressStore((state) => state.fetchAddressById);

  const addAddress = useAddressStore((state) => state.addAddress);

  const editAddress = useAddressStore((state) => state.editAddress);

  const removeAddress = useAddressStore((state) => state.removeAddress);

  const makeDefaultAddress = useAddressStore(
    (state) => state.makeDefaultAddress,
  );

  const clearSelectedAddress = useAddressStore(
    (state) => state.clearSelectedAddress,
  );

  const clearError = useAddressStore((state) => state.clearError);

  return {
    addresses,
    selectedAddress,
    loading,
    error,
    fetchAddresses,
    fetchAddressById,
    addAddress,
    editAddress,
    removeAddress,
    makeDefaultAddress,
    clearSelectedAddress,
    clearError,
  };
};

export default useAddress;
