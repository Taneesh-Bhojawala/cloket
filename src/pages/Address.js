import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { State, City } from "country-state-city";
import { useSelector } from "react-redux";
import AddressCard from "../components/AddressCard";

// Safe ID generator
const generateId = () =>
  "addr-" + Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

export default function AddAddressPage() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const location = useLocation();
  const from = location.state?.from;
  console.log(from);

  const [form, setForm] = useState({
    line1: "",
    line2: "",
    pincode: "",
    stateCode: "",
    stateName: "",
    city: "",
    tag: "",
  });

  const [cityOptions, setCityOptions] = useState([]);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === currentUser?.email);
    if (user?.addressBook) {
      setAddresses(user.addressBook);
    }
  }, [currentUser]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!form.line1.trim()) return alert("Address Line 1 is required.");
    if (!form.pincode.trim()) return alert("Pincode is required.");
    if (form.pincode.length !== 6)
      return alert("Pincode must be exactly 6 digits.");
    if (!form.stateCode) return alert("Please select a state.");
    if (!form.city) return alert("Please select a city.");
    if (!form.tag) return alert("Please select an address type.");
    return true;
  };


  const saveAddressesToStorage = (updatedList) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === currentUser.email
        ? { ...u, addressBook: updatedList }
        : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleSave = () => {
    if (!validate()) return;

    const newAddress = {
      id: generateId(),
      ...form,
      state: form.stateName,
    };

    const updatedList = [...addresses, newAddress];
    setAddresses(updatedList);
    saveAddressesToStorage(updatedList);

    alert("Address added successfully!");
    setForm({
      line1: "",
      line2: "",
      pincode: "",
      stateCode: "",
      stateName: "",
      city: "",
      tag: "",
    });
    setCityOptions([]);
    if (from === "/cart") {
      navigate("/addrselect");
    }
    else {
      navigate(from || "/");
    }
  };

  const handleDelete = (id) => {
    const updatedList = addresses.filter((a) => a.id !== id);
    setAddresses(updatedList);
    saveAddressesToStorage(updatedList);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Box sx={{ width: 420 }}>
        {/* Existing Addresses */}
        <Typography variant="h6" gutterBottom>
          Saved Addresses 🗂️
        </Typography>
        {addresses.length === 0 && (
          <Typography>No saved addresses found.</Typography>
        )}
        {addresses.map((addr) => (
          <AddressCard key={addr.id} address={addr} onDelete={handleDelete} sx={{ my: 1 }} />
        ))}

        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate(-1)}
          sx={{ my: 2 }}
        >
          Back
        </Button>
        <Paper sx={{ p: 3, mb: 4, backgroundColor: "#dcd5c1" }}>
          <Typography variant="h5" gutterBottom>
            Add New Address 📬
          </Typography>

          <TextField
            label="Address Line 1"
            fullWidth
            value={form.line1}
            onChange={(e) => handleChange("line1", e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Address Line 2"
            fullWidth
            value={form.line2}
            onChange={(e) => handleChange("line2", e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            select
            fullWidth
            label="State"
            value={form.stateCode}
            onChange={(e) => {
              const selected = State.getStatesOfCountry("IN").find(
                (s) => s.isoCode === e.target.value
              );
              if (!selected) return;
              setForm((prev) => ({
                ...prev,
                stateCode: selected.isoCode,
                stateName: selected.name,
                city: "",
              }));
              setCityOptions(City.getCitiesOfState("IN", selected.isoCode));
            }}
            sx={{ mb: 2 }}
          >
            {State.getStatesOfCountry("IN").map((s) => (
              <MenuItem key={s.isoCode} value={s.isoCode}>
                {s.name}
              </MenuItem>
            ))}
          </TextField>

          <Autocomplete
            options={cityOptions.map((c) => c.name)}
            value={form.city}
            onChange={(_, v) => handleChange("city", v)}
            renderInput={(params) => (
              <TextField {...params} label="City" fullWidth sx={{ mb: 2 }} />
            )}
          />

          <TextField
            label="Pincode"
            fullWidth
            value={form.pincode}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val) && val.length <= 6) {
                handleChange("pincode", val);
              }
            }}
            sx={{ mb: 2 }}
          />

          <TextField
            select
            label="Address Type"
            fullWidth
            value={form.tag}
            onChange={(e) => handleChange("tag", e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Home">Home</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          <Button variant="contained" fullWidth onClick={handleSave}>
            Save Address
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
