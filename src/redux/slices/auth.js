import axios from "../../axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLogin = createAsyncThunk("auth/fetchLogin", async (params) => {
  const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
  const { data } = await axios.post("/login/token", params, {headers: headers});
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchLogin.rejected, (state) => {
        // state.data = {"access_token":"123456"};
        state.data = null;
        state.status = "error";
      });
  },
});

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;