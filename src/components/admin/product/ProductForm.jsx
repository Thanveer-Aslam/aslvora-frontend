import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  Switch,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import ImageUpload from "./ProductImages";

const schema = z.object({
  name: z.string().min(1, "Product name is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  discount: z.coerce.number().min(0).max(100),
  stockQuantity: z.coerce.number().min(0),
  availableSizes: z.string().optional(),
  availableColors: z.string().optional(),
  isActive: z.boolean(),
});

const ProductForm = ({
  categories = [],
  initialData = null,
  onSubmit,
  loading = false,
}) => {
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      name: "",
      brand: "",
      category: "",
      description: "",
      price: "",
      discount: 0,
      stockQuantity: 0,
      availableSizes: "",
      availableColors: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        brand: initialData.brand,
        category: initialData.category?._id,
        description: initialData.description,
        price: initialData.price,
        discount: initialData.discount,
        stockQuantity: initialData.stockQuantity,
        availableSizes: initialData.availableSizes?.join(", ") || "",
        availableColors: initialData.availableColors?.join(", ") || "",
        isActive: initialData.isActive,
      });

      setExistingImages(initialData.images || []);
      setNewImages([]);
    }
  }, [initialData, reset]);

  // 👇 Add it here
  useEffect(() => {
    if (!initialData) {
      setExistingImages([]);
      setNewImages([]);
    }
  }, [initialData]);

  const submitHandler = (values) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("brand", values.brand);
    formData.append("category", values.category);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("discount", values.discount);
    formData.append("stockQuantity", values.stockQuantity);
    formData.append(
      "availableSizes",
      JSON.stringify(
        values.availableSizes
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      ),
    );

    formData.append(
      "availableColors",
      JSON.stringify(
        values.availableColors
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      ),
    );

    formData.append("isActive", values.isActive);

    formData.append("existingImages", JSON.stringify(existingImages));

    newImages.forEach((image) => {
      formData.append("images", image);
    });

    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submitHandler)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Product Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Brand"
            {...register("brand")}
            error={!!errors.brand}
            helperText={errors.brand?.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Category"
            {...register("category")}
            error={!!errors.category}
            helperText={errors.category?.message}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Price"
            {...register("price")}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Discount (%)"
            {...register("discount")}
            error={!!errors.discount}
            helperText={errors.discount?.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Stock Quantity"
            {...register("stockQuantity")}
            error={!!errors.stockQuantity}
            helperText={errors.stockQuantity?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Available Sizes"
            placeholder="S, M, L, XL"
            {...register("availableSizes")}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Available Colors"
            placeholder="Black, White, Blue"
            {...register("availableColors")}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name="isActive"
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Active Product"
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <ImageUpload
            existingImages={existingImages}
            setExistingImages={setExistingImages}
            newImages={newImages}
            setNewImages={setNewImages}
          />
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end">
            <Button type="submit" variant="contained" disabled={loading}>
              {loading
                ? "Saving..."
                : initialData
                  ? "Update Product"
                  : "Create Product"}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};;

export default ProductForm;
