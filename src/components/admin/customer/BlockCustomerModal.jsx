import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const BlockCustomerModal = ({
  open,
  onClose,
  customer,
  loading = false,
  onConfirm,
}) => {
  if (!customer) return null;

  const isBlocked = customer.isBlocked;

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      keepMounted
    >
      <DialogTitle>
        {isBlocked ? "Unblock Customer" : "Block Customer"}
      </DialogTitle>

      <DialogContent>
        <Typography>
          {isBlocked ? (
            <>
              Are you sure you want to <strong>unblock</strong>{" "}
              <strong>{customer.fullName}</strong>?
            </>
          ) : (
            <>
              Are you sure you want to <strong>block</strong>{" "}
              <strong>{customer.fullName}</strong>?
            </>
          )}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {isBlocked
            ? "The customer will regain access to their account immediately."
            : "The customer will no longer be able to sign in or place new orders until they are unblocked."}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading} color="inherit">
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          color={isBlocked ? "success" : "error"}
        >
          {loading ? "Please wait..." : isBlocked ? "Unblock" : "Block"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlockCustomerModal;
