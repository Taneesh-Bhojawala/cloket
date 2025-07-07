import React from "react";
import { Paper, Typography, Button } from "@mui/material";

export default function AddressCard({ address, isSelected, onSelect, onDelete }) {
    return (
        <Paper
            elevation={isSelected ? 8 : 2}
            sx={{
                p: 2,
                width: 420,
                border: isSelected ? "2px solid #2196f3" : "1px solid #ccc",
                cursor: onSelect ? "pointer" : "default",
                transition: "0.3s",
                position: "relative",
                backgroundColor: "#dcd5c1"
            }}
            onClick={() => onSelect?.(address.id)}
        >
            <Typography fontWeight="bold">{address.tag}</Typography>
            <Typography>{address.line1}, {address.line2}</Typography>
            <Typography>{address.city}, {address.state} - {address.pincode}</Typography>

            {onDelete && (
                <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    sx={{ mt: 1 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(address.id);
                    }}
                >
                    Delete
                </Button>
            )}
        </Paper>
    );
}
