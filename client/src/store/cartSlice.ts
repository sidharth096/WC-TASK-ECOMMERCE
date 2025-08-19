import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Cart Item type (adjust fields based on your product API)
export interface CartItem {
  _id: string;
  title: string;
  price: number;
  image?: string;
  qty: number;
}

// State type
interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "qty">>) => {
      const item = state.items.find((i) => i._id === action.payload._id);
      if (item) {
        item.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
    },
    updateQty: (
      state,
      action: PayloadAction<{ id: string; qty: number }>
    ) => {
      const item = state.items.find((i) => i._id === action.payload.id);
      if (item) item.qty = action.payload.qty;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
