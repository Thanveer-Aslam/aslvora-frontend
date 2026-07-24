import { Box, Grid, MenuItem, TextField, Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const ProductFilter = ({
  search,
  setSearch,

  category,
  setCategory,

  categories,

  status,
  setStatus,

  stock,
  setStock,

  sort,
  setSort,
}) => {
  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setStatus("");
    setStock("");
    setSort("newest");
  };

  return (
    <Box
      sx={{
        p: 3,
        mb: 3,
        border: "1px solid #e5e7eb",
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Grid container spacing={2}>
        {/* Search */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Search Product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>

        {/* Category */}
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            select
            fullWidth
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>

            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Status */}
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            select
            fullWidth
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </Grid>

        {/* Stock */}
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            select
            fullWidth
            label="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="in">In Stock</MenuItem>
            <MenuItem value="low">Low Stock</MenuItem>
            <MenuItem value="out">Out of Stock</MenuItem>
          </TextField>
        </Grid>

        {/* Sort */}
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            select
            fullWidth
            label="Sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="priceLow">Price Low → High</MenuItem>
            <MenuItem value="priceHigh">Price High → Low</MenuItem>
          </TextField>
        </Grid>

        {/* Reset */}
        <Grid item xs={12} sm={6} md={1}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<RestartAltIcon />}
            onClick={clearFilters}
            sx={{ height: "56px" }}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductFilter;
