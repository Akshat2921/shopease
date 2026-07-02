import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosconfig";

const PAGE_SIZE = 8;

// Fetches a single page of products from json-server, honoring
// category filter + title search, and returns the total count
// (json-server sends it back as the X-Total-Count header) so the
// UI can render proper pagination controls.
export const asyncGetProducts = createAsyncThunk(
  "products/getPage",
  async ({ page = 1, category = "", search = "", sort = "" } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.set("_page", page);
      params.set("_limit", PAGE_SIZE);
      if (category) params.set("category", category);
      if (search) params.set("title_like", search);
      if (sort === "price-asc") {
        params.set("_sort", "price");
        params.set("_order", "asc");
      } else if (sort === "price-desc") {
        params.set("_sort", "price");
        params.set("_order", "desc");
      } else if (sort === "rating-desc") {
        params.set("_sort", "rating.rate");
        params.set("_order", "desc");
      }

      const res = await axios.get(`/products?${params.toString()}`);
      const totalCount = Number(res.headers["x-total-count"] || res.data.length);
      return { products: res.data, totalCount, page };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to load products");
    }
  }
);

export const asyncGetProductById = createAsyncThunk(
  "products/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Product not found");
    }
  }
);

export const asyncCreateProduct = createAsyncThunk(
  "products/create",
  async (product, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/products", product);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create product");
    }
  }
);

export const asyncUpdateProduct = createAsyncThunk(
  "products/update",
  async (product, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/products/${product.id}`, product);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update product");
    }
  }
);

export const asyncDeleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete product");
    }
  }
);

const initialState = {
  items: [],
  selectedProduct: null,
  page: 1,
  pageSize: PAGE_SIZE,
  totalCount: 0,
  category: "",
  search: "",
  sort: "",
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.page = 1;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(asyncGetProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.products;
        state.totalCount = action.payload.totalCount;
        state.page = action.payload.page;
      })
      .addCase(asyncGetProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(asyncGetProductById.pending, (state) => {
        state.status = "loading";
        state.selectedProduct = null;
      })
      .addCase(asyncGetProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(asyncGetProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(asyncCreateProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.totalCount += 1;
      })
      .addCase(asyncUpdateProduct.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
        state.selectedProduct = action.payload;
      })
      .addCase(asyncDeleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
        state.totalCount = Math.max(0, state.totalCount - 1);
      });
  },
});

export const { setCategory, setSearch, setSort, setPage } = productSlice.actions;
export default productSlice.reducer;
