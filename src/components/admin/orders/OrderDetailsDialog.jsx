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
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const OrderDetailsDialog = ({ open, order, onClose, onUpdateStatus }) => {
  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>Order #{order.orderNumber}</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Customer */}

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Customer
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={order.user?.profileImage}>
                  {order.user?.fullName?.charAt(0)}
                </Avatar>

                <Box>
                  <Typography fontWeight={600}>
                    {order.user?.fullName}
                  </Typography>

                  <Typography variant="body2">{order.user?.email}</Typography>

                  <Typography variant="body2">
                    {order.user?.phoneNumber}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Order */}

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Order Information
              </Typography>

              <Stack spacing={1}>
                <Typography>
                  <strong>Status:</strong> {order.orderStatus}
                </Typography>

                <Typography>
                  <strong>Payment:</strong> {order.paymentStatus}
                </Typography>

                <Typography>
                  <strong>Method:</strong> {order.paymentMethod}
                </Typography>

                <Typography>
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </Typography>
              </Stack>
            </Paper>
          </Grid>

          {/* Products */}

          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Ordered Products
              </Typography>

              <Stack spacing={2}>
                {order.items.map((item) => (
                  <Stack
                    key={item._id}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <Avatar
                      src={item.image}
                      variant="rounded"
                      sx={{
                        width: 70,
                        height: 70,
                      }}
                    />

                    <Box flex={1}>
                      <Typography fontWeight={600}>{item.name}</Typography>

                      <Typography variant="body2">
                        Size : {item.size}
                      </Typography>

                      <Typography variant="body2">
                        Color : {item.color}
                      </Typography>

                      <Typography variant="body2">
                        Qty : {item.quantity}
                      </Typography>
                    </Box>

                    <Typography fontWeight={600}>₹{item.totalPrice}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Address */}

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Shipping Address
              </Typography>

              <Typography>{order.shippingAddress?.fullName}</Typography>

              <Typography>{order.shippingAddress?.phoneNumber}</Typography>

              <Typography>{order.shippingAddress?.addressLine1}</Typography>

              {order.shippingAddress?.addressLine2 && (
                <Typography>{order.shippingAddress?.addressLine2}</Typography>
              )}

              <Typography>
                {order.shippingAddress?.city}, {order.shippingAddress?.state}
              </Typography>

              <Typography>{order.shippingAddress?.postalCode}</Typography>
            </Paper>
          </Grid>

          {/* Summary */}

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>

              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Subtotal</Typography>

                  <Typography>₹{order.subtotal}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography>Tax</Typography>

                  <Typography>₹{order.tax}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography>Discount</Typography>

                  <Typography>₹{order.discount}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography>Shipping</Typography>

                  <Typography>₹{order.shippingCharge}</Typography>
                </Stack>

                <Divider />

                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={700}>Total</Typography>

                  <Typography fontWeight={700}>₹{order.totalAmount}</Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        {order.orderStatus !== "Delivered" &&
          order.orderStatus !== "Cancelled" && (
            <Button variant="contained" onClick={() => onUpdateStatus(order)}>
              Update Status
            </Button>
          )}

        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsDialog;
