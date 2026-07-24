import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

const PaymentSettingsForm = ({
  formData,
  handleChange,
  handleSave,
  saving,
}) => {
  return (
    <Card elevation={2}>
      <CardHeader
        title="Payment Settings"
        subheader="Manage your Razorpay payment gateway credentials."
      />

      <Divider />

      <CardContent>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Razorpay Key ID
            </Typography>

            <TextField
              fullWidth
              name="keyId"
              value={formData.keyId}
              onChange={handleChange}
              placeholder="rzp_live_xxxxxxxxxxxxxx"
              helperText="Enter your Razorpay Key ID."
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Razorpay Key Secret
            </Typography>

            <TextField
              fullWidth
              type="password"
              name="keySecret"
              value={formData.keySecret}
              onChange={handleChange}
              placeholder="Enter Razorpay Key Secret"
              helperText="Keep this value secure. It will not be exposed publicly."
            />
          </Box>

          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.enabled}
                  onChange={handleChange}
                  name="enabled"
                />
              }
              label="Enable Online Payments"
            />
          </Box>

          <Divider />

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              size="large"
              onClick={handleSave}
              disabled={saving}
              sx={{ minWidth: 180 }}
            >
              {saving ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Save Settings"
              )}
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PaymentSettingsForm;
