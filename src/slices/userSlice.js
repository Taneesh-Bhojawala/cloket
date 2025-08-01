import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login: (state, action) => action.payload,
    logout: () => null,
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
