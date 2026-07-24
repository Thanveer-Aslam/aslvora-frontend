import { useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters.")
    .max(50, "Category name cannot exceed 50 characters."),

  description: z
    .string()
    .trim()
    .max(250, "Description cannot exceed 250 characters.")
    .optional(),
});

const CategoryForm = ({
  initialValues = {
    name: "",
    description: "",
  },
  onSubmit,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const submitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack spacing={3}>
        <TextField
          label="Category Name"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          minRows={4}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{
            bgcolor: "#ef4444",
            "&:hover": {
              bgcolor: "#dc2626",
            },
          }}
        >
          {loading ? "Saving..." : "Save Category"}
        </Button>
      </Stack>
    </form>
  );
};

export default CategoryForm;
