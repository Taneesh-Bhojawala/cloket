import React from "react";
import {
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  TextField,
  Button,
} from "@mui/material";

export default function Filters({
  categories,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  strapTypes,
  selectedStraps,
  setSelectedStraps,
}) {
  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleStrapChange = (strap) => {
    if (selectedStraps.includes(strap)) {
      setSelectedStraps(selectedStraps.filter((s) => s !== strap));
    } else {
      setSelectedStraps([...selectedStraps, strap]);
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

  const handleReset = () => {
    setSelectedBrands([]);
    setSelectedStraps([]);
    setPriceRange([0, 50000]);
  };

  return (
    <Box>
      {/* Brand Filter */}
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

      {/* Strap Filter */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Strap Type
        </Typography>
        {strapTypes.map((strap) => (
          <FormControlLabel
            key={strap}
            control={
              <Checkbox
                checked={selectedStraps.includes(strap)}
                onChange={() => handleStrapChange(strap)}
                sx={{ color: "black" }}
              />
            }
            label={strap}
          />
        ))}
      </Box>

      {/* Price Filter */}
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

      {/* Reset Button */}
      <Box sx={{ mt: 4 }}>
        <Button variant="outlined" color="error" fullWidth onClick={handleReset}>
          Reset All Filters
        </Button>
      </Box>
    </Box>
  );
}
