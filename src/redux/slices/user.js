import axios from "../../axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRegister = createAsyncThunk("auth/fetchRegister", async (params) => {
  const { data } = await axios.post("/user", params);
  return data;
});

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const { data } = await axios.get("/user");
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.data = null;
        state.status = "error";
      })
      .addCase(fetchUser.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchUser.rejected, (state) => {
        state.data = null;
        state.status = "error";
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.user.data);

export const { logout } = userSlice.actions;

export const userReducer = userSlice.reducer;