import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import axios from "../../api/axiosconfig";

export const asyncPlaceOrder = createAsyncThunk(
  "orders/place",
  async ({ userId, items, address, total }, { rejectWithValue }) => {
    try {
      const order = {
        id: nanoid(),
        userId,
        items,
        address,
        total,
        status: "placed",
        createdAt: new Date().toISOString(),
      };
      const { data } = await axios.post("/orders", order);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to place order");
    }
  }
);

export const asyncGetOrdersByUser = createAsyncThunk(
  "orders/getByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/orders?userId=${userId}&_sort=createdAt&_order=desc`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to load orders");
    }
  }
);

const initialState = {
  items: [],
  lastOrder: null,
  status: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearLastOrder: (state) => {
      state.lastOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncPlaceOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(asyncPlaceOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lastOrder = action.payload;
        state.items.unshift(action.payload);
      })
      .addCase(asyncPlaceOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(asyncGetOrdersByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(asyncGetOrdersByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(asyncGetOrdersByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearLastOrder } = orderSlice.actions;
export default orderSlice.reducer;
