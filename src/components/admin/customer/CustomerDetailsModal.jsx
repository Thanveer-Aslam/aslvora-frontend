import {
  Avatar,
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const CustomerDetailsModal = ({ open, onClose, customer }) => {
  if (!customer) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth keepMounted>
      <DialogTitle sx={{ fontWeight: 700 }}>Customer Details</DialogTitle>

      <DialogContent dividers>
        <Stack direction="row" spacing={3} alignItems="center" mb={4}>
          <Avatar
            src={customer.profileImage}
            alt={customer.fullName}
            sx={{
              width: 90,
              height: 90,
            }}
          >
            {customer.fullName?.charAt(0)?.toUpperCase()}
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              {customer.fullName}
            </Typography>

            <Typography color="text.secondary">{customer.email}</Typography>

            <Chip
              sx={{ mt: 1 }}
              label={customer.isBlocked ? "Blocked" : "Active"}
              color={customer.isBlocked ? "error" : "success"}
            />
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Phone Number
            </Typography>

            <Typography fontWeight={600}>
              {customer.phoneNumber || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Joined On
            </Typography>

            <Typography fontWeight={600}>
              {customer.createdAt
                ? new Date(customer.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Total Orders
            </Typography>

            <Typography fontWeight={600}>
              {customer.totalOrders ?? 0}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Total Spent
            </Typography>

            <Typography fontWeight={600}>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(customer.totalSpent ?? 0)}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Last Order Date
            </Typography>

            <Typography fontWeight={600}>
              {customer.lastOrderDate
                ? new Date(customer.lastOrderDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "-"}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="inherit" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerDetailsModal;
