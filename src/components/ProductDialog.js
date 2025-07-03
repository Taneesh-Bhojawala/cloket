import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Box,
  CardMedia,
  Rating,
  Chip,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";

export default function ProductDialog({ open, product, onClose, fromCart = false }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cartItems = useSelector((state) => {
    const userEmail = state.cart?.user;
    const itemsByUser = state.cart?.itemsByUser || {};
    return userEmail && itemsByUser[userEmail] ? itemsByUser[userEmail] : [];
  });

  const isInCart = cartItems.some((item) => item.id === product?.id);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login first!");
      return;
    }
    if (!isInCart) dispatch(addToCart(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth >
      <DialogTitle sx={{ fontWeight: "bold" }}>{product.title}</DialogTitle>
      <Divider />
      <DialogContent sx={{ display: "flex", flexDirection: "row", gap: 4, mt: 2 }}>
        {/* Image */}
        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.title}
          sx={{
            width: "40%",
            objectFit: "contain",
            borderRadius: 2,
            border: "1px solid #ccc",
            p: 1,
          }}
        />

        {/* Details */}
        <Box sx={{ flex: 1 }}>
          <Typography gutterBottom>{product.description}</Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
            {product.tags?.map((tag) => (
              <Chip label={tag} key={tag} size="small" color="primary" onClick={(e) => e.stopPropagation()} clickable={false} />
            ))}
          </Stack>


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

          <Typography sx={{ color: "red" }}><strong>Discount:</strong> {product.discountPercentage}%</Typography>
          <Typography><strong>Stock:</strong> {product.stock}</Typography>
          <Typography><strong>Strap Type:</strong> {product.strap}</Typography>
          {product.brand && (
            <Typography><strong>Brand:</strong> {product.brand}</Typography>
          )}

          <Typography><strong>Category:</strong> {product.category}</Typography>
          <Typography><strong>SKU:</strong> {product.sku}</Typography>

          <Typography mt={1}><strong>Weight:</strong> {product.weight}g</Typography>
          <Typography><strong>Dimensions:</strong> {product.dimensions?.width} × {product.dimensions?.height} × {product.dimensions?.depth}</Typography>

          <Typography mt={1}><strong>Availability:</strong> {product.availabilityStatus}</Typography>
          <Typography><strong>Shipping:</strong> {product.shippingInformation}</Typography>
          <Typography><strong>Warranty:</strong> {product.warrantyInformation}</Typography>
          <Typography><strong>Return Policy:</strong> {product.returnPolicy}</Typography>

          <Box mt={2}>
            <Rating value={product.rating} readOnly precision={0.1} />
          </Box>

          {/* Reviews */}
          <Box mt={3}>
            <Typography variant="subtitle1" fontWeight="bold">Reviews:</Typography>
            {product.reviews?.map((rev, index) => (
              <Box key={index} sx={{ mt: 1, pl: 1 }}>
                <Rating size="small" value={rev.rating} readOnly />
                <Typography variant="body2" fontStyle="italic">"{rev.comment}"</Typography>
                <Typography variant="caption">- {rev.reviewerName}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        {fromCart ? (
          <Button variant="outlined" color="error" onClick={handleRemoveFromCart}>
            Remove from Cart
          </Button>
        ) : (
          <Button
            variant="contained"
            disabled={isInCart}
            sx={{ backgroundColor: isInCart ? "#ccc" : "#ffc107", color: "#000" }}
            onClick={handleAddToCart}
          >
            {isInCart ? "✔️ Added to Cart" : "Add to Cart"}
          </Button>
        )}
        <Button onClick={onClose} variant="outlined" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

