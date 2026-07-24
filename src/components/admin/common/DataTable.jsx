import { DataGrid } from "@mui/x-data-grid";
import { Box, Skeleton, Stack } from "@mui/material";

const CustomLoadingOverlay = () => {
  return (
    <Stack
      spacing={1.5}
      sx={{
        width: "100%",
        p: 3,
      }}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <Stack key={index} direction="row" spacing={2} alignItems="center">
          <Skeleton variant="circular" width={40} height={40} />

          <Skeleton variant="rounded" width="20%" height={20} />

          <Skeleton variant="rounded" width="15%" height={20} />

          <Skeleton variant="rounded" width="10%" height={20} />

          <Skeleton variant="rounded" width="12%" height={20} />

          <Skeleton variant="rounded" width="10%" height={20} />

          <Skeleton variant="rounded" width={80} height={32} />
        </Stack>
      ))}
    </Stack>
  );
};

const DataTable = ({
  rows = [],
  columns = [],
  loading = false,
  pageSize = 10,
  checkboxSelection = false,
  disableRowSelectionOnClick = true,
  autoHeight = true,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#fff",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        slots={{
          loadingOverlay: CustomLoadingOverlay,
        }}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
        autoHeight={autoHeight}
        pageSizeOptions={[5, 10, 20, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize,
            },
          },
        }}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        getRowId={(row) => row._id}
        sx={{
          border: "none",

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f8fafc",
            fontWeight: 700,
            fontSize: "14px",
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 700,
          },

          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
          },

          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f9fafb",
          },

          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #e5e7eb",
          },

          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
        }}
      />
    </Box>
  );
};

export default DataTable;
