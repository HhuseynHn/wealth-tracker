import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState, LoginCredentials } from "../types";
// import type { AuthState, LoginCredentials, User } from "../types";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials) => {
    // Login məntiqi
    return user;
  }
);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  registrationSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
  },
});

export default authSlice.reducer;
