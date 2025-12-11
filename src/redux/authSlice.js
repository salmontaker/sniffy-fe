import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isSubscribed: false
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
      state.isSubscribed = false;
    },
    setSubscriptionStatus(state, action) {
      state.isSubscribed = action.payload;
    }
  }
});

export const { setUser, clearUser, setSubscriptionStatus } = authSlice.actions;
export const selectAuthUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => !!state.auth.user;
export const selectIsSubscribed = (state) => state.auth.isSubscribed;

export default authSlice.reducer;
