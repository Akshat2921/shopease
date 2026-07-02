import { createSlice } from "@reduxjs/toolkit";

const loadWishlist = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("wishlist"));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

const persist = (items) => localStorage.setItem("wishlist", JSON.stringify(items));

const initialState = {
  items: loadWishlist(), // full product objects, deduped by id
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.some((item) => item.id === product.id);
      state.items = exists
        ? state.items.filter((item) => item.id !== product.id)
        : [...state.items, product];
      persist(state.items);
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      persist(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      persist(state.items);
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
