import React from "react";
import { Box, Typography, Container, Grid, Link, Divider } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 5,
        backgroundColor: "#2e2e2e",
        color: "#dcdcdc",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1: About */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              MyShop
            </Typography>
            <Typography variant="body2">
              Premium watches for every occasion. Quality and elegance, delivered to your doorstep.
            </Typography>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="#" underline="hover" color="inherit">Home</Link>
              <Link href="/cart" underline="hover" color="inherit">Cart</Link>
            </Box>
          </Grid>

          {/* Column 3: Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">Email: support@myshop.com</Typography>
            <Typography variant="body2">Phone: +91 98765 43210</Typography>
            <Typography variant="body2">Mon - Fri: 9 AM to 6 PM</Typography>
          </Grid>

          {/* Column 4: Address */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Address
            </Typography>
            <Typography variant="body2">
              MyShop Pvt. Ltd.<br />
              123, MG Road,<br />
              Bengaluru, India - 560001
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: "#444" }} />

        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} MyShop. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
