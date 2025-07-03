import { useEffect, useState, useRef } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import SSlider from "react-slick";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import ProductDialog from "../components/ProductDialog";
import Footer from "../components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [strapTypes, setStrapTypes] = useState([]);
  const [selectedStraps, setSelectedStraps] = useState([]);

  const productGrid = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/watches")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
        const uniqueBrands = [...new Set(data.products.map((p) => p.brand))];
        setCategories(uniqueBrands);
        const uniqueStraps = [...new Set(data.products.map((p) => p.strap))];
        setStrapTypes(uniqueStraps);

      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchStrap =
      selectedStraps.length === 0 || selectedStraps.includes(product.strap);
    const matchSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchBrand && matchStrap && matchSearch && matchPrice;
  });


  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const getFirstProductPerCategory = () => {
    const seen = new Set();
    return products.filter((p) => {
      if (!seen.has(p.brand)) {
        seen.add(p.brand);
        return true;
      }
      return false;
    });
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
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
      {/* SLIDESHOW */}
      <Box sx={{ mb: 5, display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 1100,
            ".slick-prev:before, .slick-next:before": {
              color: "#588157",
              fontSize: "25px",
            },
          }}
        >
          <SSlider {...sliderSettings}>
            {getFirstProductPerCategory().map((product) => (
              <Box
                key={product.id}
                onClick={() => handleCardClick(product)}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  px: 2,
                  outline: "none",
                  "&:focus": { outline: "none" },
                }}
              >
                <Card
                  sx={{
                    backgroundColor: "#dcd5c1",
                    width: "100%",
                    height: 400,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "stretch",
                    overflow: "hidden",
                    p: 0,
                    boxShadow: 3,
                    cursor: "pointer",
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ flex: 1, height: "100%" }}>
                    <CardMedia
                      component="img"
                      image={product.thumbnail}
                      alt={product.title}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                  <CardContent
                    sx={{
                      flex: 1,
                      px: 4,
                      py: 3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {product.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                      {product.description?.slice(0, 120)}...
                    </Typography>
                    <Typography variant="subtitle2">
                      Category: {product.category}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </SSlider>
        </Box>
      </Box>

      {/* SIDEBAR + PRODUCT GRID */}
      <Box sx={{ display: "flex", gap: 4.5 }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: "250px",
            backgroundColor: "#dcd5c1",
            borderRadius: 2,
            p: 2,
            color: "black",
            boxShadow: 1,
            height: "570px"
          }}
        >
          <Filters
            categories={categories}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            strapTypes={strapTypes}
            selectedStraps={selectedStraps}
            setSelectedStraps={setSelectedStraps}
          />
        </Box>

        {/* Product Grid */}
        <Box sx={{ flex: 1 }}>
          {filteredProducts.length === 0 ? (
            <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 4 }}>
              No matching products!
            </Typography>
          ) : (
            <Grid container spacing={3} ref={productGrid}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <ProductCard product={product} onClick={() => handleCardClick(product)} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>

      {/* Product Dialog */}
      <ProductDialog open={open} product={selectedProduct} onClose={handleClose} />
      <Footer />
    </Container>
  );
}