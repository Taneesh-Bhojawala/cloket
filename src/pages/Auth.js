import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { login } from "../slices/userSlice";
import { setCartUser } from "../slices/cartSlice";

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password || (!isLogin && !fullName)) {
      alert("All fields are required.");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      alert("Please enter a valid email address.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (isLogin) {
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        dispatch(login({ fullName: user.fullName, email: user.email }));
        dispatch(setCartUser(user.email));
        alert("Login successful!");
        navigate("/");
      } else {
        alert("Invalid email or password.");
      }
    } else {
      const userExists = users.some((u) => u.email === email);

      if (userExists) {
        alert("Email already registered.");
        return;
      }

      const newUser = { fullName, email, password };
      const updatedUsers = [...users, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      dispatch(login({ fullName, email }));
      dispatch(setCartUser(email));
      alert("Registered successfully!");
      navigate("/");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <Paper sx={{ p: 4, width: 320, textAlign: "center" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevent page reload
            handleSubmit();
          }}
        >
          <Typography variant="h5" gutterBottom>
            {isLogin ? "Login" : "Register"}
          </Typography>

          {!isLogin && (
            <TextField
              fullWidth
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button fullWidth variant="contained" type="submit">
            {isLogin ? "Login" : "Register"}
          </Button>
        </form>

        <Button
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin ? "Register?" : "Login?"}
        </Button>
      </Paper>
    </Box>
  );
}
