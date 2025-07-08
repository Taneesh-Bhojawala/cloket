import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../slices/cartSlice";
import CartItem from "../components/CartItem";

function generateIdFromTimestamp() {
    return 'order-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 10);
}

export default function SummaryPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user);

    const cartItems = useSelector((state) => {
        const itemsByUser = state.cart?.itemsByUser || {};
        return currentUser?.email && itemsByUser[currentUser.email]
            ? itemsByUser[currentUser.email]
            : [];
    });

    const [address, setAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("cod");

    useEffect(() => {
        if (!currentUser || !currentUser.email) {
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((u) => u.email === currentUser.email);
        const selectedId = localStorage.getItem("selectedAddressId");
        const selectedAddress = user?.addressBook?.find((a) => a.id === selectedId);
        setAddress(selectedAddress);
    }, [currentUser, navigate]);

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handlePlaceOrder = () => {
        if (!address) {
            alert("No delivery address selected.");
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const updatedUsers = users.map((u) => {
            if (u.email === currentUser.email) {
                const newOrder = {
                    id: generateIdFromTimestamp(),
                    date: new Date().toISOString(),
                    items: cartItems,
                    address,
                    total,
                    paymentMethod,
                };

                return {
                    ...u,
                    orders: [...(u.orders || []), newOrder],
                };
            }
            return u;
        });

        localStorage.setItem("users", JSON.stringify(updatedUsers));

        alert(
            `Order placed successfully via ${paymentMethod === "cod" ? "Cash on Delivery" : "UPI"
            }!`
        );

        dispatch(clearCart());
        localStorage.removeItem("selectedAddressId");
        navigate("/orders");
    };

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4">Final Summary 🧾</Typography>
                <Button variant="contained" onClick={() => navigate("/cart")}>
                    Back to Cart
                </Button>
            </Box>

            {/* Cart Items */}
            <Paper sx={{ p: 3, mb: 3, backgroundColor: "#dcd5c1", }}>
                <Typography variant="h6" gutterBottom>
                    Items in Your Cart:
                </Typography>
                {cartItems.map((item) => <CartItem key={item.id} item={item} />)}
                <Typography fontWeight="bold">Total: ${total.toFixed(2)}</Typography>
            </Paper>

            {/* Address */}
            <Paper sx={{ p: 3, mb: 3, backgroundColor: "#dcd5c1" }}>
                <Typography variant="h6" gutterBottom>
                    Deliver To:
                </Typography>
                {address ? (
                    <Box>
                        <Typography>{address.tag}</Typography>
                        <Typography>{address.line1}, {address.line2}</Typography>
                        <Typography>{address.city}, {address.state} - {address.pincode}</Typography>
                    </Box>
                ) : (
                    <Typography color="error">No address selected.</Typography>
                )}
            </Paper>

            {/* Payment */}
            <Paper sx={{ p: 3, mb: 3, backgroundColor: "#dcd5c1" }}>
                <Typography variant="h6" gutterBottom>
                    Choose Payment Method:
                </Typography>
                <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
                    <FormControlLabel value="upi" control={<Radio />} label="UPI / Online Payment" />
                </RadioGroup>
            </Paper>

            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePlaceOrder}
            >
                Place Order
            </Button>
        </Box>
    );
}
