import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import CategoryForm from "./CategoryForm";

const CategoryModal = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  category = null,
}) => {
  const isEdit = Boolean(category);

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ fontWeight: 700 }}>
        {isEdit ? "Edit Category" : "Create Category"}
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <CategoryForm
          initialValues={{
            name: category?.name || "",
            description: category?.description || "",
          }}
          onSubmit={onSubmit}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
