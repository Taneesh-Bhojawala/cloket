import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";


export default function ProductCard({
  product,
  onClick,
  showRemoveButton = false,
  onRemove,
}) {
  return (
    <Card
      elevation={10}
      onClick={onClick}
      sx={{
        backgroundColor: "#FFF8",
        border: "2px solid black",
        minHeight: 270,
        height: "auto",
        width: 250,
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: onClick ? "scale(1.05)" : "none",
          boxShadow: onClick ? 6 : 0,
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.title}
          sx={{ height: 160, objectFit: "contain", p: 1 }}
        />
        <CardContent>
          <Typography variant="h6" noWrap>
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price}
          </Typography>
        </CardContent>
      </Box>

      {showRemoveButton && (
        <Box sx={{ px: 2, pb: 2 }}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              onRemove && onRemove(product.id);
            }}
          >
            Remove
          </Button>
        </Box>
      )}

    </Card>
  );
}
