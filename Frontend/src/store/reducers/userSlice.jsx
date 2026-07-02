import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosconfig";

// ---- Thunks ----

export const asyncLoginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/users?email=${credentials.email}&password=${credentials.password}`
      );
      if (!data.length) {
        return rejectWithValue("Invalid email or password");
      }
      localStorage.setItem("user", JSON.stringify(data[0]));
      return data[0];
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const asyncRegisterUser = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      const existing = await axios.get(`/users?email=${user.email}`);
      if (existing.data.length) {
        return rejectWithValue("An account with this email already exists");
      }
      const { data } = await axios.post("/users", user);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

export const asyncUpdateUser = createAsyncThunk(
  "user/update",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/users/${user.id}`, user);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Update failed");
    }
  }
);

export const asyncCurrentUser = createAsyncThunk("user/current", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user || null;
});

export const asyncLogoutUser = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("user");
  return null;
});

const initialState = {
  currentUser: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncLoginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(asyncLoginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(asyncLoginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(asyncRegisterUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(asyncRegisterUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(asyncRegisterUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(asyncUpdateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(asyncCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(asyncLogoutUser.fulfilled, (state) => {
        state.currentUser = null;
      });
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
