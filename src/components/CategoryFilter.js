import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

export default function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <FormControl
      sx={{
        width: "25vw",
        minWidth: "180px",
        backgroundColor: "white",
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#333',
            borderWidth: '2px',
          },
          '&:hover fieldset': {
            borderColor: '#000',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#000',
            borderWidth: '2px',
          },
        },
      }}
    >
      <InputLabel>Filter</InputLabel>
      <Select
        value={selectedCategory}
        label="Filter by Category"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <MenuItem value="">All</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
