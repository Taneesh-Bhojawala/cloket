import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsByUser: {},
    user: null,
  },
  reducers: {
    setCartUser: (state, action) => {
      state.user = action.payload;
      if (!state.itemsByUser[state.user]) {
        state.itemsByUser[state.user] = [];
      }
    },

    addToCart: (state, action) => {
      if (!state.user) return;
      const userCart = state.itemsByUser[state.user];
      const exists = userCart.some(item => item.id === action.payload.id);
      if (!exists) {
        userCart.push(action.payload);
      }
    },

    removeFromCart: (state, action) => {
      if (!state.user) return;
      state.itemsByUser[state.user] = state.itemsByUser[state.user].filter(
        (item) => item.id !== action.payload
      );
    },

    clearCart: (state) => {
      if (!state.user) return;
      state.itemsByUser[state.user] = [];
    }
  }
});

export const { addToCart, removeFromCart, clearCart, setCartUser } = cartSlice.actions;
export default cartSlice.reducer;
