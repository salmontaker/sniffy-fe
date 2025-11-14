import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction(state, action) {
      state.user = action.payload;
    },
    logoutAction(state) {
      state.user = null;
    }
  }
});

export const { loginAction, logoutAction } = authSlice.actions;
export const selectAuthUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => !!state.auth.user;

export default authSlice.reducer;
