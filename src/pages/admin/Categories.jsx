import { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useCategories } from "../../hooks/useCategories";
import CategoryTable from "../../components/admin/category/CategoryTable";
import CategoryModal from "../../components/admin/category/CategoryModal";
import DeleteCategoryModal from "../../components/admin/category/DeleteCategoryModal";

const Categories = () => {
  const { categories, loading, addCategory, editCategory, removeCategory } =
    useCategories();

  const [openModal, setOpenModal] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Create
  const handleCreate = () => {
    setSelectedCategory(null);
    setOpenModal(true);
  };

  // Edit
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpenModal(true);
  };

  // Delete
  const handleDelete = (category) => {
    setSelectedCategory(category);
    setDeleteOpen(true);
  };

  // Save (Create / Update)
  const handleSubmit = async (data) => {
    try {
      setSubmitLoading(true);

      if (selectedCategory) {
        await editCategory(selectedCategory._id, data);
      } else {
        await addCategory(data);
      }

      setOpenModal(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    try {
      setDeleteLoading(true);

      await removeCategory(selectedCategory._id);

      setDeleteOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Box className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h4" fontWeight={700}>
            Categories
          </Typography>

          <Typography color="text.secondary">
            Manage product categories.
          </Typography>
        </div>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Add Category
        </Button>
      </div>

      {/* Table */}
      <CategoryTable
        categories={categories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create / Edit Modal */}
      <CategoryModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedCategory(null);
        }}
        category={selectedCategory}
        loading={submitLoading}
        onSubmit={handleSubmit}
      />

      {/* Delete Modal */}
      <DeleteCategoryModal
        open={deleteOpen}
        loading={deleteLoading}
        category={selectedCategory}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedCategory(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default Categories;
