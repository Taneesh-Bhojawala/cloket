import React from "react";
import {
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  TextField
} from "@mui/material";

export default function Filters({
  categories,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
}) {
  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handlePriceChange = (type, value) => {
    const newRange = [...priceRange];
    const num = parseInt(value) || 0;

    if (type === "min") {
      newRange[0] = Math.max(0, num);
    } else if (type === "max") {
      newRange[1] = Math.max(newRange[0], num);
    }

    setPriceRange(newRange);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Brand
      </Typography>
      {categories.map((brand) => (
        <FormControlLabel
          key={brand}
          control={
            <Checkbox
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
              sx={{ color: "black" }}
            />
          }
          label={brand}
        />
      ))}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Price
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Min"
            type="number"
            size="small"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange("min", e.target.value)}
            inputProps={{ min: 0 }}
            sx={{ width: "100%" }}
          />
          <TextField
            label="Max"
            type="number"
            size="small"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange("max", e.target.value)}
            sx={{ width: "100%" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
