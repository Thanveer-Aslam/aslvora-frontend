import { Avatar, Chip, IconButton, Stack, Tooltip } from "@mui/material";
import { Visibility, Block, CheckCircle } from "@mui/icons-material";

import DataTable from "../common/DataTable";

const CustomerTable = ({
  customers = [],
  loading = false,
  onView,
  onBlock,
  onUnblock,
}) => {
  const columns = [
    {
      field: "profile",
      headerName: "Customer",
      flex: 1.8,
      minWidth: 250,
      sortable: false,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Avatar
            src={params.row.profileImage}
            alt={params.row.fullName}
            sx={{ width: 42, height: 42 }}
          >
            {params.row.fullName?.charAt(0)?.toUpperCase()}
          </Avatar>

          <div>
            <div className="font-semibold text-gray-900">
              {params.row.fullName}
            </div>

            <div className="text-sm text-gray-500">{params.row.email}</div>
          </div>
        </Stack>
      ),
    },

    {
      field: "phoneNumber",
      headerName: "Phone",
      flex: 1,
      minWidth: 150,
    },

    {
      field: "totalOrders",
      headerName: "Orders",
      width: 120,
      renderCell: (params) => params.row.totalOrders ?? 0,
    },

    {
      field: "totalSpent",
      headerName: "Total Spent",
      width: 160,
      renderCell: (params) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(params.row.totalSpent ?? 0),
    },

    {
      field: "createdAt",
      headerName: "Joined",
      width: 150,
      valueFormatter: (value) => {
        if (!value) return "-";

        return new Date(value).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },

    {
      field: "isBlocked",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.value ? "Blocked" : "Active"}
          color={params.value ? "error" : "success"}
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="View Customer">
            <IconButton color="primary" onClick={() => onView(params.row)}>
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>

          {params.row.isBlocked ? (
            <Tooltip title="Unblock Customer">
              <IconButton color="success" onClick={() => onUnblock(params.row)}>
                <CheckCircle fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Block Customer">
              <IconButton color="error" onClick={() => onBlock(params.row)}>
                <Block fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      ),
    },
  ];

  return (
    <DataTable
      rows={customers}
      columns={columns}
      loading={loading}
      pageSize={10}
    />
  );
};

export default CustomerTable;
