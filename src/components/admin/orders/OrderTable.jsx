import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { Visibility, LocalShipping, Cancel } from "@mui/icons-material";

import DataTable from "../common/DataTable";
import Badge from "../../common/Badge";

const OrderTable = ({
  orders = [],
  loading = false,
  onView,
  onStatus,
  onCancel,
}) => {
  const getPaymentBadge = (status) => {
    switch (status) {
      case "Paid":
        return "success";

      case "Pending":
        return "warning";

      case "Failed":
        return "danger";

      default:
        return "default";
    }
  };

  const getOrderBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "success";

      case "Shipped":
        return "info";

      case "Processing":
        return "primary";

      case "Confirmed":
        return "purple";

      case "Pending":
        return "warning";

      case "Cancelled":
        return "danger";

      default:
        return "default";
    }
  };

  const columns = [
    {
      field: "orderNumber",
      headerName: "Order No",
      flex: 1.3,
      minWidth: 180,
    },

    {
      field: "customer",
      headerName: "Customer",
      flex: 1.8,
      minWidth: 240,
      sortable: false,

      renderCell: ({ row }) => (
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={row.user?.profileImage}>
            {row.user?.fullName?.charAt(0)}
          </Avatar>

          <Box>
            <Typography fontWeight={600}>{row.user?.fullName}</Typography>

            <Typography variant="caption" color="text.secondary">
              {row.user?.email}
            </Typography>
          </Box>
        </Stack>
      ),
    },

    {
      field: "items",
      headerName: "Items",
      width: 90,
      align: "center",
      headerAlign: "center",

      renderCell: ({ row }) => row.items.length,
    },

    {
      field: "totalAmount",
      headerName: "Amount",
      width: 130,

      renderCell: ({ value }) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(value),
    },

    {
      field: "paymentStatus",
      headerName: "Payment",
      width: 130,

      renderCell: ({ value }) => (
        <Badge variant={getPaymentBadge(value)}>{value}</Badge>
      ),
    },

    {
      field: "orderStatus",
      headerName: "Status",
      width: 140,

      renderCell: ({ value }) => (
        <Badge variant={getOrderBadge(value)}>{value}</Badge>
      ),
    },

    {
      field: "createdAt",
      headerName: "Date",
      width: 130,

      renderCell: ({ value }) => new Date(value).toLocaleDateString(),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      sortable: false,

      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="View Order">
            <IconButton color="primary" onClick={() => onView(row)}>
              <Visibility />
            </IconButton>
          </Tooltip>

          {row.orderStatus !== "Delivered" &&
            row.orderStatus !== "Cancelled" && (
              <Tooltip title="Update Status">
                <IconButton color="info" onClick={() => onStatus(row)}>
                  <LocalShipping />
                </IconButton>
              </Tooltip>
            )}

          {["Pending", "Confirmed"].includes(row.orderStatus) && (
            <Tooltip title="Cancel Order">
              <IconButton color="error" onClick={() => onCancel(row)}>
                <Cancel />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      ),
    },
  ];

  return <DataTable rows={orders} columns={columns} loading={loading} />;
};

export default OrderTable;
