import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";

import ProductTable from "../../components/admin/product/ProductTable";
import ProductModal from "../../components/admin/product/ProductModal";
import DeleteProductModal from "../../components/admin/product/DeleteProductModal";
import ProductFilter from "../../components/admin/product/ProductFilters";
// import Loader from "../../components/common/Loader";

const Products = () => {
  const { products, loading, error, addProduct, editProduct, removeProduct } =
    useProducts();

  const { categories, loading: categoriesLoading } = useCategories();

  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [stock, setStock] = useState("");
  const [sort, setSort] = useState("newest");
  

  const handleCreate = () => {
    setSelectedProduct(null);
    setOpenModal(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelectedProduct(null);
  };

  const handleSubmit = async (formData) => {
    try {
      setSubmitLoading(true);

      if (selectedProduct) {
        await editProduct(selectedProduct._id, formData);
      } else {
        await addProduct(formData);
      }

      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleteLoading(true);

      await removeProduct(selectedProduct._id);

      closeDeleteModal();
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  // const pageLoading = useMemo(() => {
  //   return loading || categoriesLoading;
  // }, [loading, categoriesLoading]);

  // if (pageLoading) {
  //   return (
  //     <Stack justifyContent="center" alignItems="center" sx={{ py: 10 }}>
  //       <Loader size="lg" text="Loading products..." />
  //     </Stack>
  //   );
  // }

  return (
    <Box>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Typography variant="h4" fontWeight={700}>
            Products
          </Typography>

          <Typography color="text.secondary">
            Manage your store products.
          </Typography>
        </div>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Add Product
        </Button>
      </div>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      <ProductFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
        status={status}
        setStatus={setStatus}
        stock={stock}
        setStock={setStock}
        sort={sort}
        setSort={setSort}
      />

      <ProductTable
        products={products
          .filter((product) => {
            const matchesSearch =
              product.name.toLowerCase().includes(search.toLowerCase()) ||
              product.brand?.toLowerCase().includes(search.toLowerCase());

            const matchesCategory =
              !category || product.category?.name === category;

            const matchesStatus =
              !status ||
              (status === "active" ? product.isActive : !product.isActive);

            const matchesStock =
              !stock ||
              (stock === "in" && product.stockQuantity > 10) ||
              (stock === "low" &&
                product.stockQuantity > 0 &&
                product.stockQuantity <= 10) ||
              (stock === "out" && product.stockQuantity === 0);

            return (
              matchesSearch && matchesCategory && matchesStatus && matchesStock
            );
          })
          .sort((a, b) => {
            switch (sort) {
              case "priceLow":
                return a.price - b.price;

              case "priceHigh":
                return b.price - a.price;

              case "oldest":
                return new Date(a.createdAt) - new Date(b.createdAt);

              default:
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
          })}
        loading={loading || categoriesLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductModal
        open={openModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
        categories={categories}
        initialData={selectedProduct}
        loading={submitLoading}
      />

      <DeleteProductModal
        open={deleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        product={selectedProduct}
        loading={deleteLoading}
      />
    </Box>
  );
};

export default Products;
