import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Badge,
  Tooltip,
  Avatar,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";

// For useContext
// import { useUser } from "../context/UserContext";
// import { useCart } from "../context/CartContext";

// For Redux
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import { setCartUser } from "../slices/cartSlice";

export default function Navbar({ searchTerm, setSearchTerm }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // For useContext
  // const { user, logout } = useUser();
  // const { getCartCount } = useCart();

  // Redux
  const user = useSelector((state) => state.user);
  const cartItems = useSelector((state) => {
  const user = state.cart?.user;
  const itemsByUser = state.cart?.itemsByUser || {};
  return user && itemsByUser[user] ? itemsByUser[user] : [];
});


  const handleLogout = () => {
    handleClose();
    dispatch(setCartUser(null));
    localStorage.removeItem("selectedAddressId");
    dispatch(logout());
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={3}
      sx={{
        width: "100vw",
        py: 1,
        background: "linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)",
        color: "white",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "nowrap",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#ffffff",
            textDecoration: "none",
            transition: "color 0.3s, text-decoration 0.3s",
            "&:hover": {
              color: "black",
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
        >
          🛍️ MyShop
        </Typography>

        <Box sx={{ flexGrow: 1, maxWidth: "500px", width: "100%" }}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton component={Link} to="/cart" color="inherit">
            {/* <Badge badgeContent={getCartCount()} color="error"> */}
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Tooltip title={user ? `Logged in as ${user.fullName}` : "Account"}>
            <IconButton onClick={handleProfileMenuOpen} color="inherit">
              {user ? (
                <Avatar sx={{ bgcolor: "#fff", color: "#1976d2", fontWeight: "bold" }}>
                  {user?.fullName?.[0]?.toUpperCase() || <AccountCircleIcon />}
                </Avatar>

              ) : (
                <Avatar sx={{ bgcolor: "#fff", color: "#1976d2" }}>
                  <AccountCircleIcon />
                </Avatar>
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {user ? 
        [
            <MenuItem disabled>
              Logged in as <strong style={{ marginLeft: 5 }}>{user.fullName}</strong>
            </MenuItem>,
            <MenuItem onClick={() => { handleClose(); navigate("/orders")}}>My Orders</MenuItem>,
            <MenuItem onClick={() => { handleClose(); navigate("/address")}}>Addresses</MenuItem>,
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        
        ] : (
          <MenuItem onClick={() => { handleClose(); navigate("/login")}}>Login / Sign Up</MenuItem>
        )}
      </Menu> 
    </AppBar>
  );
}
