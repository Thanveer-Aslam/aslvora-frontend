import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { toast } from "react-hot-toast";

import Loader from "../../components/common/Loader";

import useSettings from "../../hooks/useSettings";

import PaymentSettingsForm from "../../components/admin/settings/PaymentSettingsForm";
import TestConnectionButton from "../../components/admin/settings/TestConnectionButton";

const Settings = () => {
  const {
    paymentSettings,
    loading,
    saving,
    testing,
    updatePaymentSettings,
    testPaymentConnection,
  } = useSettings();

  const [formData, setFormData] = useState({
    provider: "razorpay",
    keyId: "",
    keySecret: "",
    webhookSecret: "",
    mode: "test",
    enabled: true,
  });

  useEffect(() => {
    if (!paymentSettings) return;

    setFormData({
      provider: paymentSettings.provider || "razorpay",
      keyId: paymentSettings.keyId || "",
      keySecret: paymentSettings.keySecret || "",
      webhookSecret: paymentSettings.webhookSecret || "",
      mode: paymentSettings.mode || "test",
      enabled: paymentSettings.enabled ?? true,
    });
  }, [paymentSettings]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      await updatePaymentSettings(formData);
      toast.success("Payment settings updated successfully.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update payment settings.",
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box maxWidth="900px">
      <Stack spacing={3}>
        <PaymentSettingsForm
          formData={formData}
          handleChange={handleChange}
          handleSave={handleSave}
          saving={saving}
        />

        <Box display="flex" justifyContent="flex-end">
          <TestConnectionButton
            testing={testing}
            testPaymentConnection={testPaymentConnection}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Settings;
