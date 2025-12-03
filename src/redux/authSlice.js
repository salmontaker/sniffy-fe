import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    }
  }
});

export const { setUser, clearUser } = authSlice.actions;
export const selectAuthUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => !!state.auth.user;

export default authSlice.reducer;
