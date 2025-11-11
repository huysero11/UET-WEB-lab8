import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      // data: { user, accessToken }
      return data;
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      return rejectWithValue(msg);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: null,
    accessToken: null,
    status: "idle", // 'idle' | 'loading' | 'error'
    error: null,
  },
  reducers: {
    logout(state) {
      state.isAuth = false;
      state.user = null;
      state.accessToken = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        state.isAuth = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken; // JWT từ BE
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload || action.error.message;
        state.isAuth = false;
        state.user = null;
        state.accessToken = null;
      });
  },
});

export default authSlice;
export const { logout } = authSlice.actions;
