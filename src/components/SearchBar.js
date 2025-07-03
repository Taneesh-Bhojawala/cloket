import React from "react";
import { TextField } from "@mui/material";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <TextField
      placeholder="Search Watches..."
      variant="outlined"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      fullWidth
      sx={{
        backgroundColor: "#dcd5c1",
        borderRadius: "30px",
        '& .MuiOutlinedInput-root': {
          borderRadius: "30px",
          '& fieldset': {
            borderColor: '#555',
            borderWidth: '2px',
          },
          '&:hover fieldset': {
            borderColor: '#222',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#000',
            borderWidth: '2px',
          },
        }
      }}
    />
  );
}
