import { useMemo, useState } from "react";
import { Box, Paper, Stack, TextField, Typography } from "@mui/material";

import Loader from "../../components/common/Loader";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import StatusUpdateDialog from "../../components/common/StatusUpdateDialog";

import OrderTable from "../../components/admin/orders/OrderTable";
import OrderDetailsDialog from "../../components/admin/orders/OrderDetailsDialog";

import useAdmin from "../../hooks/useAdmin";

const ORDER_STATUS_TRANSITIONS = {
  Pending: ["Confirmed", "Cancelled"],
  Confirmed: ["Processing", "Cancelled"],
  Processing: ["Shipped"],
  Shipped: ["Delivered"],
  Delivered: [],
  Cancelled: [],
};

const Orders = () => {
  const {
    orders,
    loading,
    fetchOrderById,
    changeOrderStatus,
    cancelAdminOrder,
  } = useAdmin({
    orders: true,
  });

  const [search, setSearch] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [openDetails, setOpenDetails] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);

  const filteredOrders = useMemo(() => {
    const keyword = search.toLowerCase();

    return orders.filter((order) => {
      return (
        order.orderNumber?.toLowerCase().includes(keyword) ||
        order.user?.fullName?.toLowerCase().includes(keyword) ||
        order.user?.email?.toLowerCase().includes(keyword)
      );
    });
  }, [orders, search]);

  const handleView = async (order) => {
    await fetchOrderById(order._id);
    setSelectedOrder(order);
    setOpenDetails(true);
  };

  const handleStatus = (order) => {
    setSelectedOrder(order);
    setOpenStatus(true);
  };

  const handleCancel = (order) => {
    setSelectedOrder(order);
    setOpenCancel(true);
  };

  const handleStatusUpdate = async (status) => {
    await changeOrderStatus(selectedOrder._id, {
      orderStatus: status,
    });

    setOpenStatus(false);
  };

  const handleCancelOrder = async () => {
    await cancelAdminOrder(selectedOrder._id);

    setOpenCancel(false);
  };

  if (loading && orders.length === 0) {
    return <Loader />;
  }

  return (
    <>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Orders
          </Typography>

          <Typography color="text.secondary">
            Manage customer orders and update order status.
          </Typography>
        </Box>

        <Paper sx={{ p: 3 }}>
          <TextField
            fullWidth
            placeholder="Search by Order Number, Customer or Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Paper>

        <OrderTable
          orders={filteredOrders}
          loading={loading}
          onView={handleView}
          onStatus={handleStatus}
          onCancel={handleCancel}
        />
      </Stack>

      <OrderDetailsDialog
        open={openDetails}
        order={selectedOrder}
        onClose={() => setOpenDetails(false)}
        onUpdateStatus={(order) => {
          setSelectedOrder(order);
          setOpenStatus(true);
        }}
      />

      <StatusUpdateDialog
        open={openStatus}
        title="Update Order Status"
        currentStatus={selectedOrder?.orderStatus}
        options={ORDER_STATUS_TRANSITIONS[selectedOrder?.orderStatus] || []}
        loading={loading}
        onClose={() => setOpenStatus(false)}
        onConfirm={handleStatusUpdate}
      />

      <ConfirmDialog
        isOpen={openCancel}
        title="Cancel Order"
        message="Are you sure you want to cancel this order?"
        confirmText="Cancel Order"
        danger
        loading={loading}
        onClose={() => setOpenCancel(false)}
        onConfirm={handleCancelOrder}
      />
    </>
  );
};

export default Orders;
