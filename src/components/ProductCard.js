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
      elevation={5}
      onClick={onClick}
      sx={{
        backgroundColor: "#dcd5c1",
        border: "2px solid black",
        minHeight: 270,
        height: "auto",
        width: 260,
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
          sx={{
            height: 160,
            width: "100%",
            objectFit: "cover",
            borderBottom: "1px solid #ddd",
          }}
        />

        <CardContent>
          <Typography variant="h6" noWrap>
            {product.title}
          </Typography>
          <Typography>
            <strong>Price:</strong>{" "}
            <span style={product.discountPercentage > 0 ? { textDecoration: "line-through" } : {}}>
              ${product.price}
            </span>
            {product.discountPercentage > 0 && (
              <>
                {" "}
                <span style={{ color: "green" }}>
                  ${((100 - product.discountPercentage) / 100 * product.price).toFixed(2)}
                </span>
              </>
            )}
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
