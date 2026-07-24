import { useEffect } from "react";
import useSettingsStore from "../store/settingsStore";

const useSettings = () => {
  const {
    paymentSettings,
    loading,
    saving,
    testing,
    fetchPaymentSettings,
    updatePaymentSettings,
    testPaymentConnection,
  } = useSettingsStore();

  useEffect(() => {
    fetchPaymentSettings();
  }, [fetchPaymentSettings]);

  return {
    paymentSettings,
    loading,
    saving,
    testing,
    fetchPaymentSettings,
    updatePaymentSettings,
    testPaymentConnection,
  };
};

export default useSettings;
