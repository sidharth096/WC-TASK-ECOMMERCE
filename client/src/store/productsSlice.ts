import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define Product type (adjust fields to match your API response)
export interface Product {
  _id: string;
  title: string;
  price: number;
  image?: string;
  description?: string;
}

// Define slice state
interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

const API = process.env.NEXT_PUBLIC_API_BASE_URL as string;

// Async thunk
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetch",
  async () => {
    const res = await axios.get<{ success: boolean; error: boolean; message: string; data: { products: Product[] } }>(
      `${API}/product/getProducts`
    );
    return res.data.data.products;
  }
);
// Slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch products";
      });
  },
});

export default productsSlice.reducer;
