import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import axios from "../../api/axiosconfig";

export const asyncGetReviews = createAsyncThunk(
  "reviews/getForProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/reviews?productId=${productId}&_sort=date&_order=desc`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to load reviews");
    }
  }
);

export const asyncAddReview = createAsyncThunk(
  "reviews/add",
  async ({ productId, userId, username, rating, comment }, { rejectWithValue }) => {
    try {
      const review = {
        id: nanoid(),
        productId,
        userId,
        username,
        rating,
        comment,
        date: new Date().toISOString().slice(0, 10),
      };
      const { data } = await axios.post("/reviews", review);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to submit review");
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(asyncGetReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(asyncGetReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(asyncAddReview.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  },
});

export default reviewSlice.reducer;
