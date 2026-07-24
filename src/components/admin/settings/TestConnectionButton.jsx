import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-hot-toast";

const TestConnectionButton = ({ testing, testPaymentConnection }) => {
  const handleTest = async () => {
    try {
      const response = await testPaymentConnection();

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to connect to Razorpay.",
      );
    }
  };

  return (
    <Button variant="outlined" onClick={handleTest} disabled={testing}>
      {testing ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        "Test Connection"
      )}
    </Button>
  );
};

export default TestConnectionButton;
