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
import Slider from "react-slick";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import ProductDialog from "../components/ProductDialog";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const productGrid = useRef(null);

  useEffect(() => {
    if (selectedCategory && productGrid.current) {
      productGrid.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedCategory]);

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

  const getFirstProductPerCategory = () => {
    const seen = new Set();
    return products.filter((p) => {
      if (!seen.has(p.category)) {
        seen.add(p.category);
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
      {/* === SLIDESHOW === */}
      <Box sx={{ mb: 5, display: "flex", justifyContent: "center", }}>
        <Box sx={{
          width: "100%", maxWidth: 1100, ".slick-prev:before, .slick-next:before": {
            color: "black",
            fontSize: "25px",
          },
        }}>
          <Slider {...sliderSettings}>
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
                  "&:focus": {
                    outline: "none",
                  },
                }
                }
              >
                <Card
                  sx={{
                    backgroundColor: "#FFF8",
                    width: "100%",
                    height: 400,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    justifyContent: "space-between",
                    overflow: "hidden",
                    p: 2,
                    boxShadow: 3,
                    cursor: "pointer",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.thumbnail}
                    alt={product.title}
                    sx={{
                      width: { xs: "100%", sm: "50%" },
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: 2,
                    }}
                  />
                  <CardContent
                    sx={{
                      width: { xs: "100%", sm: "50%" },
                      p: 3,
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {product.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {product.description?.slice(0, 120)}...
                    </Typography>
                    <Typography variant="subtitle2" mt={1}>
                      Category: {product.category}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box >

      {/* === CATEGORY FILTER === */}
      < Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2, mb: 4 }
      }>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box >

      {/* === PRODUCT GRID === */}
      {
        filteredProducts.length === 0 ? (
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 4 }}>
            No matching products!
          </Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center" ref={productGrid}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard product={product} onClick={() => handleCardClick(product)} />
              </Grid>
            ))}
          </Grid>
        )
      }

      {/* === PRODUCT DIALOG === */}
      <ProductDialog open={open} product={selectedProduct} onClose={handleClose} />
    </Container >
  );
}