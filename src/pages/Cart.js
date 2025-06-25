import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../slices/cartSlice";
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import ProductDialog from "../components/ProductDialog";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const cartItems = useSelector((state) => {
    const user = state.cart?.user;
    const itemsByUser = state.cart?.itemsByUser || {};
    return user && itemsByUser[user] ? itemsByUser[user] : [];
  });

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  // 🧠 AddrSelect decision logic
  const handleAddrSelect = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find((u) => u.email === user.email);
    const addresses = currentUser?.addressBook || [];

    if (addresses.length === 0) {
      navigate("/address");
    } else {
      navigate("/addrselect");
    }
  };

  if (!user) {
    return (
      <>
        <Typography variant="h5" align="center" sx={{ mt: 8 }}>
          Login to view your cart
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button variant="contained" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Box>
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Typography variant="h5" align="center" sx={{ mt: 8 }}>
        Your Cart is Empty 🛒
      </Typography>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 5 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart 🛒
      </Typography>

      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 4, flexWrap: "wrap" }}>
        {/* LEFT: Cart Items */}
        <Box sx={{ flex: 1 }}>
          <Grid container spacing={3}>
            {cartItems.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard
                  product={product}
                  showRemoveButton
                  onRemove={(id) => dispatch(removeFromCart(id))}
                  onClick={() => {
                    setSelectedProduct(product);
                    setOpen(true);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* RIGHT: Summary */}
        <Box
          sx={{
            width: 300,
            position: "sticky",
            top: 100,
            alignSelf: "flex-start",
            border: "2px solid #ccc",
            borderRadius: 2,
            p: 3,
            backgroundColor: "#f9f9f9",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Cart Summary
          </Typography>

          {cartItems.map((item) => (
            <Box key={item.id} sx={{ mb: 1 }}>
              <Typography variant="body2" fontWeight="bold">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${item.price}
              </Typography>
              <hr style={{ margin: "6px 0" }} />
            </Box>
          ))}

          <Box sx={{ my: 2 }}>
            <Typography variant="body1">
              Total Items: <strong>{cartItems.length}</strong>
            </Typography>
            <Typography variant="body1">
              Total Price: <strong>${total.toFixed(2)}</strong>
            </Typography>
          </Box>

          <Button
            sx={{ mb: 1, backgroundColor: "yellow", color: "black" }}
            variant="contained"
            fullWidth
            onClick={handleAddrSelect} // ✅ Uses new logic
          >
            Proceed To checkout
          </Button>

          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </Button>
        </Box>
      </Box>

      {/* ✅ Product Dialog */}
      <ProductDialog
        open={open}
        product={selectedProduct}
        onClose={() => setOpen(false)}
        fromCart
      />
    </Container>
  );
}
