import React from "react";
import { TextField } from "@mui/material";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <TextField
      label="Search Products"
      variant="outlined"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      fullWidth
      sx={{
        backgroundColor: "#fff",
        borderRadius: "30px",

        "& .MuiInputBase-input": {
          color: "#000",
        },

        "& .MuiInputLabel-root": {
          color: "#666",
        },

        "& .MuiInputLabel-root.Mui-focused": {
          color: "#000",
        },

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
