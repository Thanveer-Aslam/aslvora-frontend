import { useRef } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";

const MAX_IMAGES = 5;

const ImageUpload = ({
  existingImages = [],
  setExistingImages,
  newImages = [],
  setNewImages,
}) => {
  const fileInputRef = useRef(null);

  const handleSelectImages = (files) => {
    const selectedFiles = Array.from(files);

    const totalImages =
      existingImages.length + newImages.length + selectedFiles.length;

    if (totalImages > MAX_IMAGES) {
      alert(`Maximum ${MAX_IMAGES} images allowed.`);
      return;
    }

    setNewImages((prev) => [...prev, ...selectedFiles]);
  };

  const handleChange = (event) => {
    handleSelectImages(event.target.files);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    handleSelectImages(event.dataTransfer.files);
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Stack spacing={2}>
      <Typography fontWeight={600}>Product Images</Typography>

      <Box
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        sx={{
          border: "2px dashed #d1d5db",
          borderRadius: 2,
          p: 4,
          textAlign: "center",
          cursor: "pointer",
          bgcolor: "#fafafa",
        }}
        onClick={() => fileInputRef.current.click()}
      >
        <CloudUpload sx={{ fontSize: 45, color: "#ef4444" }} />

        <Typography mt={2}>Drag & Drop images here</Typography>

        <Typography variant="body2" color="text.secondary">
          or click to browse
        </Typography>

        <Typography variant="caption" display="block" mt={1}>
          Maximum 5 Images
        </Typography>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={handleChange}
        />
      </Box>

      {(existingImages.length > 0 || newImages.length > 0) && (
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {existingImages.map((image, index) => (
            <Box
              key={image.publicId}
              sx={{
                position: "relative",
                width: 120,
                height: 120,
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid #ddd",
              }}
            >
              <img
                src={image.url}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              <IconButton
                size="small"
                color="error"
                onClick={() => removeExistingImage(index)}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  bgcolor: "#fff",
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          ))}
          {newImages.map((image, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: 120,
                height: 120,
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid #ddd",
              }}
            >
              <img
                src={URL.createObjectURL(image)}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              <IconButton
                size="small"
                color="error"
                onClick={() => removeNewImage(index)}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  bgcolor: "#fff",
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Stack>
      )}

      <Button variant="outlined" onClick={() => fileInputRef.current.click()}>
        Choose Images
      </Button>
    </Stack>
  );
};

export default ImageUpload;
