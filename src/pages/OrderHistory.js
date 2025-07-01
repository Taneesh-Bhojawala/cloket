import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";

export default function PreviousOrders() {
  const currentUser = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || !currentUser.email) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === currentUser.email);
    setOrders(user?.orders || []);
  }, [currentUser, navigate]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Orders 📦
      </Typography>

      {orders.length === 0 ? (
        <Box
          sx={{
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            You have no orders yet.
          </Typography>
        </Box>
      ) : (
        orders.map((order) => (
          <Paper key={order.id} sx={{ p: 2, mb: 3 }}>
            <Typography fontWeight="bold">Order ID: {order.id}</Typography>
            <Typography>Date: {new Date(order.date).toLocaleString()}</Typography>
            <Typography>Payment: {order.paymentMethod.toUpperCase()}</Typography>
            <Typography>Total: ${order.total.toFixed(2)}</Typography>

            <Divider sx={{ my: 1 }} />

            <Typography fontWeight="bold">Items:</Typography>
            {order.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            <Typography fontWeight="bold" sx={{ mt: 2 }}>
              Delivery Address:
            </Typography>
            <Typography>{order.address.tag}</Typography>
            <Typography>
              {order.address.line1}, {order.address.line2}
            </Typography>
            <Typography>
              {order.address.city}, {order.address.state} -{" "}
              {order.address.pincode}
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
}
