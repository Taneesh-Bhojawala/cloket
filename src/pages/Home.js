import { useEffect, useState } from "react";
import { Grid, Container, Box, Typography, CircularProgress } from "@mui/material";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import ProductDialog from "../components/ProductDialog";

export default function Home({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
        const uniqueCategories = [...new Set(data.products.map((p) => p.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <Box sx={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 5 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2, mb: 4 }}>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>

      {filteredProducts.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 4 }}>
          No matching products!
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard product={product} onClick={() => handleCardClick(product)} />
            </Grid>
          ))}
        </Grid>
      )}

      <ProductDialog open={open} product={selectedProduct} onClose={handleClose} />
    </Container>
  );
}
