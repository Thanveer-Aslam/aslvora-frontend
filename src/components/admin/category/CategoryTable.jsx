import { IconButton, Tooltip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import DataTable from "../common/DataTable";

const CategoryTable = ({
  categories = [],
  loading = false,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      field: "name",
      headerName: "Category",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      minWidth: 250,
      renderCell: (params) =>
        params.value ? (
          params.value
        ) : (
          <span className="text-gray-400">No Description</span>
        ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      minWidth: 180,
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
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 140,
      renderCell: (params) => (
        <div className="flex items-center gap-1">
          <Tooltip title="Edit Category">
            <IconButton color="primary" onClick={() => onEdit(params.row)}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Category">
            <IconButton color="error" onClick={() => onDelete(params.row)}>
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      rows={categories}
      columns={columns}
      loading={loading}
      pageSize={10}
    />
  );
};

export default CategoryTable;
