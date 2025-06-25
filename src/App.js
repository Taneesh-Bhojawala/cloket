import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import AddAddressPage from "./pages/Address";
import SelectAddress from "./pages/SelectAddress";
import FinalSummary from "./pages/OrderSummary";
import PreviousOrders from "./pages/OrderHistory"
import "./App.css";

// ❌ Old context-based imports (replaced by Redux)
// import { useUser } from "./context/UserContext";
// import { CartProvider } from "./context/CartContext";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // ❌ Old context-based state access
  // const { user } = useUser();

  return (
    // ❌ Old CartContext wrapper (now handled by Redux)
    // <CartProvider currentUser={user}>
    //   <Box sx={{ minHeight: "100vh" }}>
    //     <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    //     <Routes>
    //       <Route path="/" element={<Home searchTerm={searchTerm} />} />
    //       <Route path="/cart" element={<Cart />} />
    //       <Route path="/login" element={<Auth />} />
    //     </Routes>
    //   </Box>
    // </CartProvider>

    // ✅ Redux-based version (no CartProvider needed)
    <Box sx={{ minHeight: "100vh" }}>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/address" element={<AddAddressPage />} />
        <Route path="/addrselect" element={<SelectAddress/>}/>
        <Route path="/summary" element={<FinalSummary/>}/>
        <Route path="/orders" element={<PreviousOrders/>}/>
      </Routes>
    </Box>
  );
}
