import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import ProductForm from "./ProductForm";

const ProductModal = ({
  open,
  onClose,
  onSubmit,
  categories = [],
  initialData = null,
  loading = false,
}) => {
  return (
    <Dialog
      keepMounted
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>{initialData ? "Edit Product" : "Add Product"}</DialogTitle>

      <DialogContent dividers>
        <ProductForm
          categories={categories}
          initialData={initialData}
          onSubmit={onSubmit}
          loading={loading}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
