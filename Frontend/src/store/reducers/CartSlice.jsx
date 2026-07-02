import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("cart"));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

const persist = (items) => localStorage.setItem("cart", JSON.stringify(items));

const initialState = {
  items: loadCart(), // [{ id, title, price, image, qty }]
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty: 1,
        });
      }
      persist(state.items);
    },
    incrementQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty += 1;
      persist(state.items);
    },
    decrementQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.qty > 1) item.qty -= 1;
      persist(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      persist(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      persist(state.items);
    },
  },
});

export const { addToCart, incrementQty, decrementQty, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
