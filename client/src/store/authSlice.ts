import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_BASE_URL as string;

// ---- Types ----
interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// ---- Thunks ----
export const login = createAsyncThunk<
  AuthResponse, // success return type
  { email: string; password: string }, // args type
  { rejectValue: { error: string } } // reject type
>("auth/login", async (data, thunkAPI) => {
  try {
    const res = await axios.post<AuthResponse>(`${API}/auth/login`, data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data || { error: "Login failed" });
  }
});

export const register = createAsyncThunk<
  AuthResponse,
  { name: string; email: string; password: string },
  { rejectValue: { error: string } }
>("auth/register", async (data, thunkAPI) => {
  try {
    const res = await axios.post<AuthResponse>(`${API}/auth/register`, data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data || { error: "Register failed" });
  }
});

// ---- Slice ----
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Login failed";
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Register failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
