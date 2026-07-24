import { Chip, IconButton, Tooltip, Avatar, Stack } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import DataTable from "../common/DataTable";

const ProductTable = ({ products = [], loading = false, onEdit, onDelete }) => {
  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Avatar
          src={params.row.images?.[0]?.url}
          alt={params.row.name}
          variant="rounded"
          sx={{
            width: 50,
            height: 50,
          }}
        />
      ),
    },

    {
      field: "name",
      headerName: "Product",
      flex: 1.5,
      minWidth: 220,
    },

    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
      minWidth: 140,
    },

    {
      field: "category",
      headerName: "Category",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => params.row.category?.name || "-",
    },

    {
      field: "price",
      headerName: "Price",
      width: 120,
      renderCell: (params) => `₹${params.value}`,
    },

    {
      field: "discount",
      headerName: "Discount",
      width: 120,
      renderCell: (params) => `${params.value}%`,
    },

    {
      field: "stockQuantity",
      headerName: "Stock",
      width: 120,
    },

    {
      field: "isActive",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Active" : "Inactive"}
          color={params.value ? "success" : "error"}
          size="small"
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit Product">
            <IconButton color="primary" onClick={() => onEdit(params.row)}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Product">
            <IconButton color="error" onClick={() => onDelete(params.row)}>
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <DataTable
      rows={products}
      columns={columns}
      loading={loading}
      pageSize={10}
    />
  );
};

export default ProductTable;
