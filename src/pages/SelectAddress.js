import React, { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Button
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SelectAddress() {
  const currentUser = useSelector((state) => state.user);
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || !currentUser.email) {
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === currentUser.email);
    setAddresses(user?.addressBook || []);
  }, [currentUser, navigate]);


  const handleSelect = (id) => {
    setSelectedId(id);
    localStorage.setItem("selectedAddressId", id);
  };

  const handleProceed = () => {
    if (!selectedId) {
      alert("Please select a delivery address before proceeding.");
      return;
    }
    navigate("/summary");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>Select Delivery Address</Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {addresses.map((addr) => (
          <Paper
            key={addr.id}
            elevation={selectedId === addr.id ? 8 : 2}
            sx={{
              p: 2, width: 280,
              border: selectedId === addr.id ? "2px solid #2196f3" : "1px solid #ccc",
              cursor: "pointer", transition: "0.3s"
            }}
            onClick={() => handleSelect(addr.id)}
          >
            <Typography fontWeight="bold">{addr.tag}</Typography>
            <Typography>{addr.line1}, {addr.line2}</Typography>
            <Typography>{addr.city}, {addr.state} - {addr.pincode}</Typography>
          </Paper>
        ))}
      </Box>

      <Button
        variant="contained"
        onClick={() => navigate("/address")}
        sx={{ mt: 2, mr: 2 }}
      >
        Add / Delete Address
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleProceed}
        disabled={!selectedId}
        sx={{ mt: 2 }}
      >
        Final Summary and Payment
      </Button>
    </Box>
  );
}
