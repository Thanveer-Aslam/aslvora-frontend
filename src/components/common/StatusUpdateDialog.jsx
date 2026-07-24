import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

const StatusUpdateDialog = ({
  open,
  title = "Update Status",
  currentStatus = "",
  options = [],
  loading = false,
  onClose,
  onConfirm,
}) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (open) {
      setStatus(options[0] || "");
    }
  }, [open, options]);

  const handleConfirm = () => {
    if (!status) return;

    onConfirm(status);
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Stack spacing={3} mt={1}>
          <div>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Current Status
            </Typography>

            <Typography variant="h6" fontWeight={600}>
              {currentStatus}
            </Typography>
          </div>

          <FormControl fullWidth>
            <InputLabel>Next Status</InputLabel>

            <Select
              value={status}
              label="Next Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={!status || loading}
        >
          {loading ? "Updating..." : "Update Status"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusUpdateDialog;
