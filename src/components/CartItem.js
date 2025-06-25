import React from "react";
import { Box, Typography, Divider } from "@mui/material";

export default function CartItem({ item }) {
    return (
        <Box sx={{ mb: 1 }}>
            <Typography>{item.title} - ₹{item.price.toFixed(2)}</Typography>
            <Divider sx={{ my: 1 }} />
        </Box>
    );
}
